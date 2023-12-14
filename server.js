const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const routes = require('./routes/weatherRoutes');

const app = express();
const PORT = process.env.port || 8080;
const WEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

app.use(express.json());
app.use(cors());

mongoose
.connect(process.env.MONGODB_URL) 
.then(()=> console.log(`connected to MongoDB`))
.catch((err)=> console.log(err))

app.use(routes)


app.listen(PORT, ()=>{ console.log(`app listening on: ${PORT}`);})