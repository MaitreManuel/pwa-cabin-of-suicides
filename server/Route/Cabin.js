const CabinRouter = require('express').Router();
const Cabin = require('../Model/Cabin');

module.exports = app => {
  CabinRouter.route('/')
    .get((req, res) => {
      Cabin.find((error, result) => {
        if (error) {
          res.send(error);
        } else {
          result.length < 1 ? res.status(418).send({ 'message': 'Aucun résultat' }) : res.send(result);
        }
      });
    });

  app.use('/cabin', CabinRouter);
};