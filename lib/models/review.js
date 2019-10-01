const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectID } = Schema.Types;

const schema = new Schema({
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  reviewer: {
    type: ObjectID,
    ref: 'Reviewer'
  },
  review: {
    type: String,
    required: true,
    maxlength: 140
  },
  film: {
    type: ObjectID
  }
});

module.exports = mongoose.model('Review', schema);