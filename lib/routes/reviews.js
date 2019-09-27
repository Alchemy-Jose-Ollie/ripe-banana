/* eslint-disable new-cap */
const router = require('express').Router();
const Review = require('../models/review');

router
  .post('/', (req, res, next) => {
    Review.create(req.body)
      .then(review => res.json(review))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Review.findById(req.params.id)
      .populate('reviewer')
      .then(review => {
        return res.json(review);
      })
      .catch(next);
  });

  // .get('/', (req, res, next) => {
  //   Reviewer.find()
  //     .lean()
  //     .then(reviewers => {
  //       res.json(reviewers);
  //     })
  //     .catch(next);
  // });

module.exports = router;