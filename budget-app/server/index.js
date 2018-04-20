const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const con = require('./controller')
require('dotenv').config();

const app = express();
app.use(bodyParser.json());


app.get('/api/all', con.butt)

massive(process.env.CONNECTION_STRING).then(db => {
    app.set('db', db)
    app.listen(3005, () => console.log("listening on 3005"));
})