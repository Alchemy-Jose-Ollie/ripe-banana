/* eslint-disable new-cap */
const router = require('express').Router();
const Actor = require('../models/actor');
const Film = require('../models/film');

router
  .post('/', (req, res, next) => {
    Actor.create(req.body)
      .then(actor => res.json(actor))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Actor.findById(req.params.id)
      .lean()
      .then(actor => {
        return res.json(actor);
      })
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Actor.find()
      .lean()
      .then(actors => {
        res.json(actors);
      })
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Film.find({ 'cast.actor': req.params.id })
      .then(results => {
        if(results.length > 0) {
          res.status(400)
            .catch(next);
        }
        else {
          Actor.findByIdAndRemove(req.params.id)
            .then(actor => res.json(actor))
            .catch(next);
        }
      });
  });


module.exports = router;