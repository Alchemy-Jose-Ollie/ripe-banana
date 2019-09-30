/* eslint-disable new-cap */
const router = require('express').Router();
const Studio = require('../models/studio');

router
  .post('/', (req, res, next) => {
    console.log(req.body);
    
    Studio.create(req.body)
      .then(studio => res.json(studio))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Studio.findById(req.params.id)
      .lean()
      .then(studio => {
        return res.json(studio);
      })
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Studio.find()
      .lean()
      .then(studios => {
        res.json(studios);
      })
      .catch(next);
  });

module.exports = router;