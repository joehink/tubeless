const passport = require('passport');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const { userLoggedIn } = require('../middlewares/index');

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

      
      // var oauth2Client = OAuth2(
      //   keys.clientID,
      //   keys.clientSecret,
      //   keys.callbackURL
      // );
      //
      // oauth2Client.credentials = {
      //   access_token: req.user.access_token,
      //   refresh_token: req.user.refresh_token
      // };
      //
      // console.log(google.youtube({
      //     version: 'v3',
      //     auth: oauth2Client
      // }));
    })
}
