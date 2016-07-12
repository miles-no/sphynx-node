import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.get('/pages/:path', (req, res) => {
  res.status(200).json({
    path: '/',
    layout: 'layout.hbs',
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
    live: {
      url: 'http://localhost:3001/module1',
      headerAssets: [
      ],
      footerAssets: [
      ],
    },
    admin: {
      url: 'http://localhost:3001/module1/admin',
      headerAssets: [
      ],
      footerAssets: [
      ],
    },
  }, {
    key: 'module2',
    name: 'Module 2',
    live: {
      url: 'http://localhost:3001/module2',
      headerAssets: [
      ],
      footerAssets: [
      ],
    },
    admin: {
      url: 'http://localhost:3001/module2/admin',
      headerAssets: [
      ],
      footerAssets: [
      ],
    }
  }]);
});

const server = app.listen(process.env.PORT || 3002, () => {
  console.log('info', 'API app listening on port ', server.address().port);
});
