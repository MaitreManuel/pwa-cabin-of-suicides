const io = require('../index').io;

module.exports = class Global {
  static emitEvent (eventName, data) {
    io.emit(eventName, data);
  }
};
