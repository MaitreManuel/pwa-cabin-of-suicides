const MapRouter = require('express').Router();

const ReverseGeocoding = require('../Service/Map').ReverseGeocoding;

module.exports = app => {
  MapRouter.route('/reverse-geocoding')
    .post((req, res) => {
      const locations = JSON.parse(req.query.locations);
      const token = req.query.token;
      const urlParts = JSON.parse(req.query.url);

      ReverseGeocoding(locations, token, urlParts)
        .then(result => {
          res.send(result);
        })
      ;
    });

  app.use('/map', MapRouter);
};
