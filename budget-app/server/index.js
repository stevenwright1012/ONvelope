require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const con = require('./controller');

const {CONNECTION_URI, SESSION_SECRET, DOMAIN, CLIENT_ID, CLIENT_SECRET, CALLBACK_URL} = process.env

massive(CONNECTION_URI).then(db => {
    app.set('db', db)
})

const app = express();
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}))
passport.use(new Auth0Strategy({
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: 'openid profile'
},  function(accessToken, refreshToken, extraParams, profile, done){
    return done(null, profile)
}))

passport.serializeUser((profile, done) => {
    return done(null, profile)
})
passport.deserializeUser((profile, done) => {
    return done(null, profile)
})

app.get('/auth', passport.authenticate('auth0'))
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/#/test',
    failureRedirect: 'http://localhost:3000'
}))


app.listen(3005, () => console.log("listening on 3005"));