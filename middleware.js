const express = require('express')

const app = express();

const port = 3001;

const requestLogger = (req, res, next) => {
  console.log(`Method: ${req.method}, URL: ${req.url}`);
  next();
};

app.use(requestLogger);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, this is a GET request!');
});

app.post('/', (req, res) => {
  const data = req.body;
  res.send(`Hello, you sent a POST request with this data: ${JSON.stringify(data)}`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
