const MapRouter = require('express').Router();

const ReverseGeocoding = require('../Service/Map').ReverseGeocoding;

module.exports = app => {
  MapRouter.route('/reverse-geocoding')
    .post((req, res) => {
      const locations = req.query.locations ? JSON.parse(req.query.locations) : JSON.parse(req.body.locations);
      const token = req.query.token || req.body.token;
      const urlParts = req.query.url ? JSON.parse(req.query.url) : JSON.parse(req.body.url);

      ReverseGeocoding(locations, token, urlParts)
        .then(result => {
          res.send(result);
        })
      ;
    });

  app.use('/map', MapRouter);
};
