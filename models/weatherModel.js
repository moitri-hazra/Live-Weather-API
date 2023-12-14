const mongoose = require('mongoose');

const newLocationSchema = new mongoose.Schema({
  locationName: { type: String, required: true },
  latitude: { type: Number, required: true},
  longitude: { type: Number, required: true},
});



module.exports = mongoose.model('Locations', newLocationSchema)
