const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectID } = Schema.Types;
const { RequiredString, RequiredNumber } = require('./required-types');

const schema = new Schema({
  rating: {
    type: RequiredNumber,
    min: 1,
    max: 5
  },
  reviewer: ObjectID,
  review: {
    type: RequiredString,
    maxlength: 140
  },
  film: ObjectID
});

module.exports = mongoose.model('Review', schema);