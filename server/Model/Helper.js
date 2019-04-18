const mongoose = require('mongoose');

const HelperSchema = new mongoose.Schema({
  id: Object,
  firstname: String,
  lastname: String,
  isHelping: Object,
  location: Object
}, { collection: 'helper' });

class HelperClass {
  getId() {
    return this.id;
  }

  getFirstname() {
    return this.firstname;
  }

  getLastname() {
    return this.lastname;
  }

  getFullName() {
    return `${ this.firstname } ${ this.lastname }`
  }

  getIsHelping() {
    return this.isHelping;
  }

  getIsHelpingStatus() {
    return this.isHelping.status
  }

  getIsHelpingCabin() {
    return this.isHelping.cabin;
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
}

HelperSchema.loadClass(HelperClass);
module.exports = mongoose.model('Helper', HelperSchema);