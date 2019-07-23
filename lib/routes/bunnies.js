const { Router } = require('express');
const Bunny = require('../models/Bunny');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { name, breed, age, fluffy } = req.body;
    Bunny
      .create({ name, breed, age, fluffy })
      .then(bunny => res.send(bunny))
      .catch(next);
  });  

