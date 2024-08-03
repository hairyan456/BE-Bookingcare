import express from 'express';
import configViewEngine from './configs/viewEngine';
import bodyParser from 'body-parser';
import initAPIRoutes from './routes/api';
import configCors from './configs/cors';
require('dotenv').config();

const app = express(), PORT = process.env.PORT || 8080;

//cors:
configCors(app);
//config view engine:
configViewEngine(app);

//config body-parser: 
app.use(bodyParser.json({ limit: '50mb' }));  //mặc định limit-size = 1MB
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

initAPIRoutes(app);

app.listen(PORT, () => {
    console.log("SERVER is running on PORT:", PORT);
});

