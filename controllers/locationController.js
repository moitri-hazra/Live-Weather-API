const NewLocationModel = require('../models/weatherModel')

module.exports.getLocationList = async (req, res) => {
    try {
      const locations = await NewLocationModel.find();
      res.json(locations);
    } catch (error) {
      res.status(500).json({ error: 'Server Error' });
    }
  };

  module.exports.getLocationById = async (req, res) => {
    const { locationId } = req.params;
    try {
      const loc = await NewLocationModel.findById(locationId);
      if (!loc) {
        return res.status(404).json({ error: 'Location not found' });
      }
      res.json(loc);
    } catch (error) {
      res.status(500).json({ error: 'Server Error' });
    }
  };

  module.exports.postLocation = async (req, res) => {
    const { locationName, latitude, longitude } = req.body;
    try {
      const newLocation = await NewLocationModel.create({ locationName, latitude, longitude });
      res.status(201).json(newLocation);
    } catch (error) {
      res.status(400).json({ error: 'Invalid data' });
    }
  };

  module.exports.updateLocation = async (req, res) => {
    const { locationId } = req.params;
    const { locationName, latitude, longitude } = req.body;
    try {
      const loc = await NewLocationModel.findByIdAndUpdate(
        locationId,
        { locationName, latitude, longitude },
        { new: true }
      );
      if (!loc) {
        return res.status(404).json({ error: 'Location not found' });
      }
      res.json(loc);
    } catch (error) {
      res.status(400).json({ error: 'Invalid data' });
    }
  };

  module.exports.deleteLocation = async (req, res) => {
    const { locationId } = req.params;
    try {
      const loc = await NewLocationModel.findByIdAndDelete(locationId);
      if (!loc) {
        return res.status(404).json({ error: 'Location not found' });
      }
      res.json({ message: 'Deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Server Error' });
    }
  };
  
  