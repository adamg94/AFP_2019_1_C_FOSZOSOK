const router = require('express').Router();
const request = require('request')
const Village = require('../schemas/village.schema')

let date

router.route('/getdate').get((req, res) => {
    request('http://worldtimeapi.org/api/timezone/Europe/budapest', function (error, response, body) {
        date = JSON.parse(body).datetime 
        res.json({"result" : date});
      });
})  

module.exports = router;
