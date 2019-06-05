const CabinRouter = require('express').Router();
const Cabin = require('../Model/Cabin');
const Helper = require('../Helper/Global');
const clients = require('../index').clients;

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
    })
  ;

  CabinRouter.route('/lock')
    .post((req, res) => {
      const id = req.query.id || req.body.id;
      const date = req.query.date || req.body.date;

      console.log(id);
      console.log(date);
      Cabin.findOneAndUpdate({ _id: id }, {
        $set: {
          isTaken: {
            status: true,
            since: date
          }
        }
      }, (err, result) => {
        if (err) throw err;
        Helper.emitEvent('lock', { message: 'mais oui c\'est clair' }); //.sockets.socket(clients[i].socketId)
        // for (let i = 0; i < clients.length; i++) {
        //   if (clients[i].clientId === id) {
        //     // io.clients[i].clientId.send(result);
        //     res.send(result);
        //     break;
        //   }
        // }
      });
    })
  ;

  app.use('/cabin', CabinRouter);
};
