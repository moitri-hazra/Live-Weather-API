const {Router} = require('express');
const { getLocationList, getLocationById, postLocation, updateLocation, deleteLocation } = require('../controllers/locationController');
const { getWeatherByLocationId, weatherHistory } = require('../controllers/weatherController');

const router = Router();

router.get('/', getLocationList);
router.get('/:locationId', getLocationById );
router.post('/post', postLocation);
router.put('/update/:locationId', updateLocation);
router.delete('/delete/:locationId', deleteLocation);

router.get('/weather/:locationId', getWeatherByLocationId);
router.get('/history', weatherHistory);


module.exports = router;