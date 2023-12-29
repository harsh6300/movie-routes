const mongoose = require('mongoose');

const crudschema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    images : {
        type :String,
        required : true 
    }
})

const tblname = mongoose.model('crud', crudschema);
module.exports = tblname;