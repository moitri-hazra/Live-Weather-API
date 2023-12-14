const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const routes = require('./routes/weatherRoutes');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.port || 8080;
const WEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100 
  });


app.use(express.json());
app.use(cors());
app.use(apiLimiter);

mongoose
.connect(process.env.MONGODB_URL) 
.then(()=> console.log(`connected to MongoDB`))
.catch((err)=> console.log(err))

app.use(routes)


app.listen(PORT, ()=>{ console.log(`app listening on: ${PORT}`);})