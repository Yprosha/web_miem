const express = require('express');
const path = require("path");
const app = express();
require('dotenv').config();

const PORT = process.env.APP_PORT || 8081;

console.log(process.env.APP_PORT)

const mainRoute = require('./route/main.route');
const apiRoute = require('./route/api.route');

const publicStaticMiddleware = express.static(path.join(__dirname, 'public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/', publicStaticMiddleware, mainRoute);
app.use('/api', apiRoute);



app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));