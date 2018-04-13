const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const con = require('./controller')
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

massive(process.env.CONNECTION_STRING).then(db => {
    app.set('db', db)
})

app.get('/api/all', con.butt)

app.listen(3005, () => console.log("listening on 3005"));