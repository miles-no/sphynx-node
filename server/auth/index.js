import passport from 'passport';
import sessions from './sessions';
import local from './local';

export default {
  init(app) {
    sessions.init(passport);

    app.use(passport.initialize());
    app.use(passport.session());

    local(passport).routes(app);

    app.get('/logout', (req, res) => {
      req.logout();
      res.redirect(req.headers.referer);
    });
  },
};
