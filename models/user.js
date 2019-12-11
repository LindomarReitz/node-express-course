const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String
});

module.exports = userSchema;