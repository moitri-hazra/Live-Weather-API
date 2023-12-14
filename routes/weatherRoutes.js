const {Router} = require('express');
const { getLocationList, getLocationById, postLocation, updateLocation, deleteLocation } = require('../controllers/locationController');
const { getWeatherByLocationId, weatherHistory } = require('../controllers/weatherController');

const router = Router();

router.get('/locations', getLocationList);
router.get('/locations/:locationId', getLocationById );
router.post('/locations', postLocation);
router.put('/locations/:locationId', updateLocation);
router.delete('/locations/:locationId', deleteLocation);

router.get('/weather/:locationId', getWeatherByLocationId);
router.get('/history', weatherHistory);


module.exports = router;