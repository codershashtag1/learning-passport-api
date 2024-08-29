require('dotenv').config()

const express = require('express');
const app = express();
const authRoute = require('./routes/oauth-routes');
const passportSetup = require('./config/passport-config')
const passport = require('passport');
const session = require('express-session');

app.set('view engine', 'ejs');

app.use(
  session({
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_Key,
  })
);  

app.use(passport.initialize());
app.use(passport.session())

app.get('/', (req, res) => {
  res.render('home');
})

app.use("/auth", authRoute);

app.listen(3000, (req, res) => {
  console.log("App is running on port 3000");
});