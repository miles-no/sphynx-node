export default {
  init(passport) {
    passport.serializeUser((user, done) => {
      done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
      done(null, { id });
    });
  },
};
