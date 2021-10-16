const express = require('express');
const serveStatic = require("serve-static")
const path = require('path');
const request = require('request');
const app = express();


let apiKey = process.env.DASHBOARD_API_KEY;

app.all('/api/*', function (req, res) {
  var url = `https://crypto-bot-stefanini.herokuapp.com${req.originalUrl}`;
  
  request(url, {
    headers: {
      'key': apiKey
    }
  }).on('response', function (response) {
    response.headers['Access-Control-Allow-Origin'] = '*';
  }).pipe(res);

});

app.use(serveStatic(path.join(__dirname, 'dist')));
app.all('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});


const port = process.env.PORT || 8081;
app.listen(port);