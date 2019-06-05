const HelperRouter = require('express').Router();
const Helper = require('../Model/Helper');

module.exports = app => {
  HelperRouter.route('/')
    .get((req, res) => {
      Helper.find((error, result) => {
        if (error) {
          res.send(error);
        } else {
          result.length < 1 ? res.status(418).send({ 'message': 'Aucun résultat' }) : res.send(result);
        }
      });
    })
  ;

  app.use('/helper', HelperRouter);
};
