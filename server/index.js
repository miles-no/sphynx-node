import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import logger from 'morgan';
import middleware from './middleware';
import auth from './auth';
import config from './config';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({
  secret: process.env.SESSION_SECRET || 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}));

app.use((req, res, next) => {
  // Tell upstream proxies to process ESI
  res.set('Surrogate-Control', 'ESI/1.0');
  next();
});

auth.init(app);
app.use(middleware(Object.assign(config, {
  apiUrl: process.env.API_URL || 'http://localhost:3002',
})));

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handlers

// Development error handler
// Will print stacktrace
if (process.env.NODE_ENV !== 'production') {
  app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err,
    });
  });
}

// Production error handler
// No stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json('error', {
    message: err.message,
    error: {}
  });
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log('info', 'Sphynx app listening on port ', server.address().port);
});
