import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

app.get('/module1', (req, res) => {
  res.send('Hello').end();
});
app.get('/module1/admin', (req, res) => {
  res.send('<input type="text" value="Hello" />').end();
});

app.get('/module2', (req, res) => {
  res.send('World').end();
});
app.get('/module2/admin', (req, res) => {
  res.send('<input type="text" value="World" />').end();
});

const server = app.listen(process.env.PORT || 3001, () => {
  console.log('info', 'Module Service app listening on port ', server.address().port);
});
