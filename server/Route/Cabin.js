if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const Twilio = require('twilio');

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

      Cabin.findOneAndUpdate({ _id: id }, {
        $set: {
          isTaken: {
            status: true,
            since: date
          }
        }
      }, (err, result) => {
        if (err) throw err;
        Helper.emitEvent('lock', { message: 'Cabine déverrouillée' }); //.sockets.socket(clients[i].socketId)
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

  CabinRouter.route('/death')
    .post((req, res) => {
      const fromNum = `${ req.query.fromNum || req.body.fromNum || process.env.DEFAULT_NUMBER }`;
      const name = req.query.name || req.body.name;
      const to = `${ req.query.to || req.body.to }`;
      const toName = req.query.toName || req.body.toName;

      const accountSid = process.env.SMS_SID;
      const authToken = process.env.SMS_TOKEN;
      const TwilioClient = Twilio(accountSid, authToken);

      console.log(fromNum);
      console.log(name);
      console.log(to);
      console.log(toName);
      console.log(accountSid);
      console.log(authToken);

      TwilioClient.messages
        .create({
          body: `\nBonjour ${ toName },\n${ name } a décidé de mettre fin à ses jours et vous a désigné en tant que personne à contacter.\nNous sommes désolés de vous apprendre cette nouvelle et nous vous annonçons nos condoléances.`,
          from: fromNum,
          to: to
        })
        .then(message => res.send(message.sid));
    })
  ;

  app.use('/cabin', CabinRouter);
};
