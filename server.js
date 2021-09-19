const express = require('express');
const serveStatic = require("serve-static")
const path = require('path');
const request = require('request');
app = express();
app.use(serveStatic(path.join(__dirname, 'dist')));
const port = process.env.PORT || 8080;
app.all('/api/*', function(req, res)
{
    var url = `https://stefanini-hackathon2021-api.herokuapp.com${req.path}`;
    request(url).pipe(res);
});
app.listen(port);