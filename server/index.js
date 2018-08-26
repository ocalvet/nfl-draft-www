const express = require('express');
const fetch = require('isomorphic-fetch');
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', async (req, res) => {
  const response = await fetch(`https://www.fantasyfootballnerd.com/service/draft-rankings/json/${process.env.TOKEN}`);
  const data = await response.json();
  res.json(data);
});

app.listen(8282, () => {
  console.log('listening 8282');
});