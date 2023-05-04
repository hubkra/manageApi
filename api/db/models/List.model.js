const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ListSchema = new Schema({
    title:{
        type: String,
        required: true,
        minlength: 1,
    }

});

const List = mongoose.model('List', ListSchema);

module.exports = { List };