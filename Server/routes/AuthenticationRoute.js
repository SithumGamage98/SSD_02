const express = require('express');
const passport = require('passport');
const router = express.Router();

// Route to initiate Google OAuth login
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

// Route to handle Google OAuth callback
router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  // Redirect or respond as needed after successful authentication
  res.redirect('/');
});

// Route to logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
