var router = require('express').Router();
var request = require('request');
var path = require('path');
var usAirports = require('./usAirports').usAirports;

router.get('/', function(req, res, next) {
    var index = path.join(__dirname, 'index.html')
    res.sendFile(index);
});

router.get('/airports', function(req, res, next) {
    res.status(200).send(usAirports);
})

router.post('/distance', function(req, res, next) {
    var key = '341144e09075dfdc917f0e94e2be9bf0'
    var requestUrl = 'https://airport.api.aero/airport/distance/' +
        req.body.from + '/' + req.body.dest +
        '?user_key=' + key + '&units=mile';

    request({
        url: requestUrl,
        json: true
    }, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            res.status(200).send(body)
        } else {
            console.log("Error! ", err);
        }
    })
})

module.exports = router;