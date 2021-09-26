const express = require('express');
const serveStatic = require("serve-static")
const path = require('path');
const request = require('request');
const app = express();
app.use(serveStatic(path.join(__dirname, 'dist')));
const port = process.env.PORT || 8081;
app.all('/api/*', function(req, res)
{
    var url = `https://stefanini-hackathon2021-api.herokuapp.com${req.originalUrl}`;
    
    request(url).on('response', function(response) {
      response.headers['Access-Control-Allow-Origin'] = '*';
    }) .pipe(res);
    
});
app.listen(port);