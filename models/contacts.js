const mongoose = require('mongoose');

//defining a model
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

//create schema
const ContactsSchema = new Schema({
    name: String,
    designation: String,
    company: String,
    industry: String,
    email: String,
    phone: String,
    country: String,
    user : {type : mongoose.Schema.Types.ObjectId , ref: 'User' }

})

//create collection/model using this schema
const Contacts =mongoose.model('Contacts',ContactsSchema);

module.exports = Contacts;