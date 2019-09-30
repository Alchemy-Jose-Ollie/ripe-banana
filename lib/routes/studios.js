/* eslint-disable new-cap */
const router = require('express').Router();
const Studio = require('../models/studio');
const Film = require('../models/film');

router
  .post('/', (req, res, next) => {

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
  })

  .delete('/:id', (req, res, next) => {
    Film.find({ studio: req.params.id })
      .then(results => {
        if(results.length > 0) {          
          return new Error('Cannot delete a studio with existing films')
            .catch(next);    
        }
        else {
          Studio.findByIdAndRemove(req.params.id)
            .then(studio => res.json(studio))
            .catch(next);
        }
      });
  });

module.exports = router;