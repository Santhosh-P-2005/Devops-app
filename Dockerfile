FROM node:14
WORKDIR /app
COPY . .
RUN npm install express
EXPOSE 3000
CMD ["node", "app.js"]
