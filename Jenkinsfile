pipeline {
  agent any
  environment {
    DOCKER_IMAGE = "your-dockerhub-user/blue-green-app"
  }
  stages {
    stage('Clone') {
      steps {
        git 'https://github.com/youruser/blue-green-app.git'
      }
    }
    stage('Build Docker Image') {
      steps {
        sh 'docker build -t $DOCKER_IMAGE:green .'
      }
    }
    stage('Push Docker Image') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
          sh 'echo $PASS | docker login -u $USER --password-stdin'
          sh 'docker push $DOCKER_IMAGE:green'
        }
      }
    }
    stage('Deploy to Green') {
      steps {
        sh 'kubectl apply -f green-deployment.yaml'
      }
    }
    stage('Verify Green') {
      steps {
        echo 'Manual or automated test goes here'
      }
    }
    stage('Switch Traffic to Green') {
      steps {
        sh 'kubectl patch service myapp-service -p "{\"spec\":{\"selector\":{\"app\":\"myapp\",\"version\":\"green\"}}}"'
      }
    }
    stage('Delete Blue') {
      steps {
        sh 'kubectl delete deployment blue-deployment || true'
      }
    }
  }
}
