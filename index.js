const express = require('express')
const path = require('path');
const swaggerUi = require('swagger-ui-express');

const app = express()

const PORT = process.env.PORT || 3000;
const API_PATH = process.env.API_PATH || path.join(__dirname, 'apis');
const API_URL = process.env.API_URL || "/apis/uspto.swagger.yml"
var api_urls = require('./api_urls.js');

var options = {
    swaggerUrls: api_urls,
    swaggerUrl: API_URL,
    swaggerOptions: {
        validatorUrl : null
    },
    explorer : true,
    customSiteTitle:'CIRA Labs Swagger UI'
}
app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(null, options));

app.get('/apis/:api', function(req, res) {
    res.sendFile(path.join(API_PATH, req.params.api));
});

app.use('/swagger-config.yaml', express.static(__dirname + '/swagger-config.yaml'))

app.listen(PORT)