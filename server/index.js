if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);
const clients = [];
module.exports.io = io;
module.exports.clients = clients;

const Helpers = require('./Helper/Global');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_URL = `mongodb://${ DB_USER }:${ DB_PASSWORD }@${ process.env.DB_URL }`;
const DB_PORT = process.env.PORT || process.env.DB_PORT || 5000;
const DB_OPTIONS = { useNewUrlParser: true };


mongoose.connect(DB_URL, DB_OPTIONS);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

server.listen(DB_PORT, () => {
  console.log(`Server servin' from good ol' port ${ DB_PORT }`);
});

app.get('/', (req, res) => {
  res.send('Route /');
});

require('./Route/Cabin')(app);
require('./Route/Helper')(app);
require('./Route/Map')(app);

io.sockets.on('connection', socket => {
  socket.on('register', data => {
    let findOne = false;

    for (let i = 0; i < clients.length; i++){
      if (data && data.id && clients[i].clientId === data.id){
        findOne = true;
        clients[i].socketId = socket.id;
        break;
      }
    }

    if (!findOne) {
      clients.push({
        socketId: socket.id,
        clientId: data.id
      });
    }
  });
});

module.exports.app = app;
