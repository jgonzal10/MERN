const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const femmesRoutes = express.Router();

let Femme = require('./femme.model');
app.use(cors());
app.use(bodyParser.json());


//DATABASE CONNECTION
mongoose.connect('mongodb://127.0.0.1:27017/femmeit', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
})

///Express Router 



//ALL FEMMES
femmesRoutes.route('/').get((req, res) => {
    // retrieve a list of all girls
    Femme.find((err, femmes) => {
        if (err) {
            console.log(err);
        } else {
            res.json(femmes);
        }
    });
});

//FEMME BY ID
femmesRoutes.route('/:id').get((req, res) => {
    let id = req.params.id;
    Femme.findById(id, (err, femme) => {
        res.json(femme);
    });
});

//ADD FEMME
femmesRoutes.route('/add').post((req, res) => {
    let femme = new Femme(req.body);

    femme.save()
        .then(femme => {
            res.status(200).json({ 'femme': 'femme added successfully' });
        })
        .catch(err => {
            res.status(400).send('adding new femme failed');
        });
});


//UPDATE FEMME
femmesRoutes.route('/update/:id').post((req, res) => {
    Femme.findById(req.params.id, (err, femme) => {
        if (!femme)
            res.status(404).send("data is not found");
        else
            femme.name = req.body.name;
        femme.job = req.body.job;
        femme.save().then(femme => {
            res.json('Femme updated!');
        })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});


app.use('/femmes', femmesRoutes);


app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});