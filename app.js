const express = require('express');
const app = express();
const port = 3000;

const color = process.env.COLOR || 'blue';

app.get('/', (req, res) => {
  res.send(`Hello from the ${color} version`);
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
