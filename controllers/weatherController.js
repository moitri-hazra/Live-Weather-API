const axios = require('axios');
const NewLocationModel = require('../models/weatherModel');


const getData = async (lat, lon) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};


const getWeatherHistory = async (lat, lon, start, end) => {
  try {
    const response = await axios.get(
      `https://history.openweathermap.org/data/2.5/history/city?lat=${lat}&lon=${lon}&type=hour&start=${start}&end=${end}&appid=${process.env.OPENWEATHER_API_KEY}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};


module.exports.getWeatherByLocationId = async (req, res) => {
  const { locationId } = req.params;
  try {
    const location = await NewLocationModel.findById(locationId);
    const lat = location.latitude;
    const lon = location.longitude;
    const weatherData = await getData(lat, lon);
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};



module.exports.weatherHistory = async (req, res) => {
    try {
      const { startDate, endDate, locationId } = req.body;
  
      const start = new Date(startDate).getTime() / 1000;
      const end = new Date(endDate).getTime() / 1000;
  
      const location = await NewLocationModel.findById(locationId);
      if (!location) {
        return res.status(404).json({ error: "Location not found" });
      }
  
      const lat = location.latitude;
      const lon = location.longitude;
      const weatherHistory = await getWeatherHistory(lat, lon, start, end);
      res.json(weatherHistory);
    } catch (error) {
        console.log(error);
      res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
  };
