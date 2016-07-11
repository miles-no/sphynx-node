import express from 'express';

const app = express();

app.get('/pages/:path', (req, res) => {
  res.status(200).json({
    path: '/',
    layout: 'layout.hbs',
    adminLayout: 'layout.hbs',
    modules: [{
      key: 'module1',
      id: '1',
    }, {
      key: 'module2',
      id: '2',
      requireAuth: true,
    }],
  });
});

app.get('/moduledefinitions', (req, res) => {
  res.status(200).json([{
    key: 'module1',
    name: 'Module 1',
    url: 'http://localhost:3001/module1',
    adminUrl: 'http://localhost:3001/module1/admin',
  }, {
    key: 'module2',
    name: 'Module 2',
    url: 'http://localhost:3001/module2',
    adminUrl: 'http://localhost:3001/module2/admin',
  }]);
});

const server = app.listen(process.env.PORT || 3002, () => {
  console.log('info', 'API app listening on port ', server.address().port);
});
