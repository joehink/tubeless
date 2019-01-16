const passport = require('passport')

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
    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    })
}
