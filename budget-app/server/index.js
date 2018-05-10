require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const con = require('./controller');

const {CONNECTION_URI, SESSION_SECRET, DOMAIN, CLIENT_ID, CLIENT_SECRET, CALLBACK_URL, SUCCESS_REDIRECT, FAILURE_REDIRECT} = process.env

massive(CONNECTION_URI).then(db => {
    app.set('db', db)
    
})


const app = express();
app.use(bodyParser.json());

app.use( express.static( `${__dirname}/../build` ) );

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}))
app.use(passport.initialize());
app.use(passport.session());

passport.use(new Auth0Strategy({
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: 'openid profile'
},  function(accessToken, refreshToken, extraParams, profile, done){   
    const db = app.get('db');
    const {nickname, id} = profile;
    db.find_user([id]).then( user => {
        if (user[0]){
            return done(null, user[0].user_id)
        }
        else{
            db.create_user([nickname, id]).then( createdUser => {
                return done(null, createdUser[0].user_id)
            })
        }
    })
}))

passport.serializeUser((id, done) => {
    return done(null, id)
})
passport.deserializeUser( (id, done) => {
    app.get('db').find_session_user([id]).then( user => {
        return done(null, user[0])
    })
})

///// Auth endpoints//////
app.get('/auth', passport.authenticate('auth0'))
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: SUCCESS_REDIRECT,
    failureRedirect: FAILURE_REDIRECT
}))
app.get('/auth/me', (req, res) => {
    if(req.user){
        res.status(200).send(req.user);
    }
    else{
        res.sendStatus(401)
    }
})

//////transactions endpoints/////
app.get('/api/trans/:id', con.allTrans)
app.post('/api/addtrans', con.addTrans)
app.put('/api/delete', con.deleteTrans)
app.put('/api/edit', con.editTrans)

/////envelope endpoints/////
app.get('/api/envelopes/:id', con.allEnvelopes)
app.post('/api/addenvelope', con.addEnvelope)
app.put('/api/move', con.move)
app.delete('/api/envdelete/:id', con.deleteEnv)

//////Payday endpoint//////
app.put('/api/plan', con.changePlan)

/////Logout//////
app.get('/logout', (req, res) => {
    req.logOut();
    res.redirect(FAILURE_REDIRECT)
})



app.listen(3005, () => console.log("listening on 3005"));