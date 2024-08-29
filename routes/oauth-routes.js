const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}))

router.get('/logout', (req, res) => {
  req.logout;
  res.redirect('/')
})

router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  res.render("google", { userName: req.user.userName, id: req.user.googleId });
});

module.exports = router