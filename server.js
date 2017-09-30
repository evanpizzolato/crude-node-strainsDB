//console.log('TESTING TESTING 123');

const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(bodyParser.json())


var db;

//connect to mongoDb
MongoClient.connect('mongodb://evanpizzolato:Five228508@ds155424.mlab.com:55424/strains-db', (err, database) => {
    //...start the server
    if (err) return console.log(err);
    db = database;
    app.listen(3000, function() {
        console.log('listening on 3000 baby');
    })
})


//all crud handlers here..
//READ
app.get('/', (req, res) => {
    //res.sendFile(__dirname + '/index.html');
    db.collection('strains').find().toArray( (err, results) => {
        if (err) return console.log(err);
        //render index.ejs
        res.render('index.ejs', {strains: results})
    })
})

//posting everything to the Db and redirecting the user back to the homepage '/'
//CREATE
app.post('/strains', (req, res) => {
    db.collection('strains').save(req.body, (err, results) => {
        if (err) return console.log(err);

        console.log('saved to dB');
        res.redirect('/');
    })
})

//PUT aka UPDATE
app.put('/strains', (req, res) => {
    //handle put request
    db.collection('strains').findOneAndUpdate({thoughts: 'good'}, {
        $set: {
            date: req.body.date,
            strain: req.body.strain,
            thoughts: req.body.thoughts
        }
    }, {
        sort: {_id: -1},
        upsert: true
    }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
    })
})

//DELETE
app.delete('/strains', (req, res) => {
    //handle delete event. Delete first strain with 'good' as a thought
    db.collection('strains').findOneAndDelete({
        thoughts: req.body.thoughts
    }, (err, result) => {
        if (err) return res.send(500, err)
        res.send({message: 'a "good" strain has been deleted'})
    })
})