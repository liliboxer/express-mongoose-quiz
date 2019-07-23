const { Router } = require('express');
const Bunny = require('../models/Bunny');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { name, breed, age, fluffy } = req.body;
    Bunny
      .create({ name, breed, age, fluffy })
      .then(bunny => res.send(bunny))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Bunny
      .find()
      .then(bunnies => res.send(bunnies))
      .catch(next);
  })
  .put('/:id', (req, res, next) => {
    Bunny
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(bunny => res.send(bunny))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    Bunny
      .findByIdAndDelete(req.params.id)
      .then(bunny => res.send(bunny))
      .catch(next);
  });

