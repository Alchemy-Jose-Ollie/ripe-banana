const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;
const { RequiredString } = require('./required-types');

const schema = new Schema({
  title: RequiredString,
  studio: {
    type: ObjectId,
    ref: 'Studio',
    required: true
  },
  released: {
    type: Number,
    maxlength: 4,
    required: true
  },
  cast: [{
    role: String,
    actor: {
      type: ObjectId,
      ref: 'Actor'
    } 
  }]
});

module.exports = mongoose.model('Film', schema);