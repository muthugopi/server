import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import db from "./db.mjs";
import User from "../../models/user.model.mjs";

passport.use(
  new LocalStrategy({usernameField : "name"}, async (name, password, done) => {
    try{

      const userLogin = await User.findOne({
        where : {name}
      });
      if(!userLogin) {
        return done(null, false, {msg : " Invalid Username"});
      }

      const comparePassword = await bcrypt.compare(password, userLogin.password);
      if(!comparePassword) {
        return done(null, false, {msg : "Invalid Password"});
      }
      done(null, userLogin);
    }
    catch(err) {
      console.log("error inside passport.mjs");
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    if (!user) return done(null, false);
    done(null, user);
  } catch (err) {
    done(err);
  }
});


export default passport