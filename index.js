import getConfig from 'next/config';
import cors from 'cors';

const { publicRuntimeConfig } = getConfig();
const express = require('express');
const path = require('path');
const PORT = `${publicRuntimeConfig.PORT}` || 3000;

var corsOptions = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}

app = express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(cors(corsOptions))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
