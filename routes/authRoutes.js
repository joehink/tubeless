const passport = require('passport');
const axios = require('axios');
const { userLoggedIn } = require('../middlewares/index');
const mongoose = require('mongoose');
const User = mongoose.model('users')

const keys = require('../config/keys');

module.exports = app => {

    // This route launches the login process
    // redirects you to the youtube login
    // Passsport verifys that you logged in successfully and sends back your account ID
    app.get('/auth/google', passport.authenticate('youtube'));

    // This is the route you are returned to after you login to youtube
    // Passport takes your account ID from previous route and returns your profile data
    app.get('/auth/google/callback', passport.authenticate('youtube'), (req, res) => {
        res.redirect("/")
    });

    // When route hit, log out user
    // Send back to landing page
    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect("/")
    })

    // When route hit, send back JSON data for user
    app.get('/api/current_user', userLoggedIn, (req, res) => {
        res.send(req.user)
    })

    app.get('/api/refresh_token', async (req, res) => {
      const response = await axios({
        method: 'POST',
        url: 'https://www.googleapis.com/oauth2/v4/token',
        data: {
          client_id: keys.googleClientID,
          client_secret: keys.googleClientSecret,
          refresh_token: req.user.refreshToken,
          grant_type: 'refresh_token'
        }
      })

      const user = await User.findByIdAndUpdate(req.user.id, {
        accessToken: response.data.access_token
      }, {new: true})

      req.user = user;

      res.send(req.user);
    })
}
