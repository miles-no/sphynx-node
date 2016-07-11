import { Strategy as LocalStrategy } from 'passport-local';


export default function (passport) {
  passport.use(new LocalStrategy((username, password, done) => {
    done(null, { id: 1 });
  }));

  return {
    routes(app) {
      app.post('/login',
        passport.authenticate('local', { failureRedirect: '/fail' }),
        (req, res) => {
          res.redirect(req.headers.referer);
        });
    },
  };
}
