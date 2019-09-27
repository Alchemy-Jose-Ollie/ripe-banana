/* eslint-disable new-cap */
const router = require('express').Router();
const Reviewer = require('../models/reviewer');

router
  .post('/', (req, res, next) => {
    Reviewer.create(req.body)
      .then(reviewer => res.json(reviewer))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Reviewer.findById(req.params.id)
      .lean()
      .then(reviewer => {
        return res.json(reviewer);
      })
      .catch(next);
  });

  // .get('/', (req, res, next) => {
  //   Studio.find()
  //     .lean()
  //     .then(studios => {
  //       res.json(studios);
  //     })
  //     .catch(next);
  // });

module.exports = router;