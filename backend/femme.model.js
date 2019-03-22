const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Femme = new Schema({
    name: {
        type: String
    },
    job: {
        type: String
    }
});
module.exports = mongoose.model('Femme', Femme);