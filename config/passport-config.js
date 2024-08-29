require("dotenv").config();

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");

let usersArr = [];

passport.serializeUser((user, done) => {
  console.log(user.id);
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  let findUser = usersArr.find(e => e.id == id);
  done(null, findUser);
})

passport.use(
  new GoogleStrategy(
    {
      callbackURL: "/auth/google/redirect",
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    },
    (accessToken, refreshToken, profile, done) => {
      let user = usersArr.filter(e => e.googleId == profile.id);
      if(user.length == 0) {
        usersArr.push({ id: usersArr.length + 1, googleId: profile.id, userName: profile.displayName });
        console.log("Push", usersArr[usersArr.length - 1]);
        done(null, usersArr[usersArr.length - 1]);
      } else {
        console.log("Exists", user[0]);
        done(null, user[0]);
      }
    }
  )
);
