import express from 'express';

const app = express();

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
        'http://example.com/css1.css',
        'http://example.com/css2.css',
      ],
      footerAssets: [
        'http://example.com/js1.js',
        'http://example.com/js2.js',
      ],
    },
    admin: {
      url: 'http://localhost:3001/module1/admin',
      headerAssets: [
        'http://example.com/css1.css',
        'http://example.com/css2.css',
      ],
      footerAssets: [
        'http://example.com/js1.js',
        'http://example.com/js2.js',
      ],
    },
  }, {
    key: 'module2',
    name: 'Module 2',
    live: {
      url: 'http://localhost:3001/module2',
      headerAssets: [
        'http://example.com/css1.css',
        'http://example.com/css3.css',
      ],
      footerAssets: [
        'http://example.com/js2.js',
        'http://example.com/js3.js',
      ],
    },
    admin: {
      url: 'http://localhost:3001/module2/admin',
      headerAssets: [
        'http://example.com/css1.css',
        'http://example.com/css3.css',
      ],
      footerAssets: [
        'http://example.com/js2.js',
        'http://example.com/js3.js',
      ],
    }
  }]);
});

const server = app.listen(process.env.PORT || 3002, () => {
  console.log('info', 'API app listening on port ', server.address().port);
});
