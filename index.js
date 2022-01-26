import getConfig from 'next/config';
import cors from 'cors';

const { publicRuntimeConfig } = getConfig();
const express = require('express');
const path = require('path');
const PORT = `${publicRuntimeConfig.PORT}` || 3000;

app = express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

app.use(cors());

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next()
});