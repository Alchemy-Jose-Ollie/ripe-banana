const mongoose = require('mongoose');

const { Schema } = mongoose;
const { RequiredString, RequiredNumber } = require('./required-types');

const schema = new Schema({
  title: RequiredString,
  studio: RequiredString,
  released: RequiredNumber,
  cast: [{
    role: String,
    actor: RequiredString
  }]
});

module.exports = mongoose.model('Film', schema);