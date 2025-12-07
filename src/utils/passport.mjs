import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import db from "./db.mjs";

passport.use(
  new LocalStrategy({usernameField : "name"}, (name, password, done) => {
    db.query("SELECT * FROM users WHERE name = ?", [name], async (err, data) => {
      if (err) return done(err);

      if (data.length === 0) {
        return done(null, false, { message: "User not found" });
      }

      const user = data[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return done(null, false, { message: "Invalid password" });
      }

      return done(null, user);
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const query = "SELECT * FROM users WHERE id = ?";
  db.query(query, [id], (err, data) => {
    if (err) return done(err);
    done(null, data[0]);
  });
});

export default passport