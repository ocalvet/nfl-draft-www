const express = require('express');
const fetch = require('isomorphic-fetch');
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  res.end('Welcome to the draft notes API');
});

app.get('/:url', async (req, res) => {
  try {
    const url = `https://www.fantasyfootballnerd.com/service/${req.params.url}/json/${process.env.TOKEN}`;
    console.log(`making request to ${url}`)
    const response = await fetch(url);
    const textData = await response.text();
    const data = await response.json();
    res.json(data);
  } catch (e) {
    res.statusCode = 400;
    res.json(e);
  }
});

app.listen(8282, () => {
  console.log('listening 8282');
});
