const mongoose = require('mongoose');

const CabinSchema = new mongoose.Schema({
  id: Object,
  name: String,
  location: Object,
  isTaken: Object
}, { collection: 'cabin' });

class CabinClass {
  getId() {
    return this.id;
  }

  getName() {
    return this.name
  }

  getLocation() {
    return this.location;
  }

  getLatitude() {
    return this.location.latitude;
  }

  getLongitude() {
    return this.location.longitude;
  }

  getIsTaken() {
    return this.isTaken;
  }

  getIsTakenSince() {
    return this.isTaken.since;
  }

  getIsTakenStatus() {
    return this.isTaken.status;
  }
}

CabinSchema.loadClass(CabinClass);
module.exports = mongoose.model('Cabin', CabinSchema);