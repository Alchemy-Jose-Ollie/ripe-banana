/* eslint-disable new-cap */
const router = require('express').Router();
const Studio = require('../models/studio');
const Films = require('../routes/films');

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
    // Films.get('/api/films/')
    //   .then(film => {
    //     if(film)
    //   })

    Studio.findByIdAndRemove(req.params.id)
      .then(studio => res.json(studio))
      .catch(next);
  });

module.exports = router;