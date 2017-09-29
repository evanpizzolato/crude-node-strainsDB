//console.log('TESTING TESTING 123');

const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();

app.set('view engine', 'ejs');
var db;

MongoClient.connect('mongodb://evanpizzolato:Five228508@ds155424.mlab.com:55424/strains-db', (err, database) => {
    //...start the server
    if (err) return console.log(err);
    db = database;
    app.listen(3000, function() {
        console.log('listening on 3000 baby');
    })
})

app.use(bodyParser.urlencoded({extended: true}))

//all crud handlers here..

app.get('/', (req, res) => {
    //res.sendFile(__dirname + '/index.html');
    db.collection('strains').find().toArray( (err, results) => {
        if (err) return console.log(err);
        //render index.ejs
        res.render('index.ejs', {strains: results})
    })
})

//posting everything to the Db and redirecting the user back to the homepage '/'
app.post('/strains', (req, res) => {
    db.collection('strains').save(req.body, (err, results) => {
        if (err) return console.log(err);

        console.log('saved to dB');
        res.redirect('/');
    })
})