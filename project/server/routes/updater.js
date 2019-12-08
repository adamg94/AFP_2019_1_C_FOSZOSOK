const router = require("express").Router();
const request = require("request");
const Village = require("../schemas/village.schema");
const GAMESETTINGS = require("../village.config");
let newdate;
let date;

router.route("/getdate").get((req, res) => {
  request("http://worldtimeapi.org/api/timezone/Europe/budapest", function(
    error,
    response,
    body
  ) {
    date = JSON.parse(body).datetime;
    res.json({ result: date });
  });
});

router.route("/villageupdate").post((req, res) => {
  Village.findOne(
    { userId: req.body.userId },
    (err2, village_findOne_result) => {
      if (err2) {
        console.log(`Village.findById() Error: '${err2}'!`);
        res.json({ success: false, message: `Server Error! 'v002'` });
        return;
      }
      if (village_findOne_result) {
        request("http://localhost:5000/update/getdate", async function(
          err3,
          response,
          body
        ) {
          if (err3) {
            console.log(`NTP Server call Error: '${err3}'!`);
            res.json({ success: false, message: `Server Error! 'v003'` });
            return;
          }

          /***
           *
           *
           * ELŐZŐ BÁRMILYEN INTERAKCIÓ ÓTA ELTELT IDŐ ALAPJÁN KISZÁMOLJA A FRISSÍTENDŐ ADATOK MENNYISÉGÉT
           *
           *
           */

          newdate = JSON.parse(body).result;
          const timeSinceLastUpdate = parseFloat(
            (Date.parse(newdate) -
              Date.parse(village_findOne_result.lastupdate)) /
              1000
          );

          //fa
          village_findOne_result.buildings.warehouse.wood +=
            GAMESETTINGS.BASE_MULTIPLIER *
            (timeSinceLastUpdate *
              ((village_findOne_result.buildings.lumberyard.level * 80) /
                3600));

          //agyag
          village_findOne_result.buildings.warehouse.brick +=
            GAMESETTINGS.BASE_MULTIPLIER *
            (timeSinceLastUpdate *
              ((village_findOne_result.buildings.brickyard.level * 80) / 3600));
          //vas bár itt még mást is kell majd változtatni //TODO
          village_findOne_result.buildings.warehouse.iron +=
            GAMESETTINGS.BASE_MULTIPLIER *
            (timeSinceLastUpdate *
              ((village_findOne_result.buildings.ironmine.level * 80) / 3600));

          village_findOne_result.lastupdate = newdate;
          let save_result = await village_findOne_result
            .save()
            .then(_ => {
              res.json({
                success: true,
                message: "Village Updated",
                village: village_findOne_result
              });
              return;
            })
            .catch(err => console.log(err));
        });
      } else {
        //nincs faluja -> új felhasználó
        res.json({
          success: false,
          message: "Village need to be registered"
        });
        return;
      }
    }
  );
});

module.exports = router;
