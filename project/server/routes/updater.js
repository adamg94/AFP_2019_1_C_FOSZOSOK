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
          let templeMultiplier = village_findOne_result.buildings.lumberyard.level;
          if(templeMultiplier >= 75){
            templeMultiplier = 1.2;
          }
          else if (templeMultiplier <= 25){
            templeMultiplier = 0.8;
          }
          else{
            templeMultiplier = 1;
          }
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
                3600)) * templeMultiplier;

          //agyag
          village_findOne_result.buildings.warehouse.brick +=
            GAMESETTINGS.BASE_MULTIPLIER *
            (timeSinceLastUpdate *
              ((village_findOne_result.buildings.brickyard.level * 80) / 3600)) * templeMultiplier;

              //búza
				village_findOne_result.buildings.warehouse.wheat +=
        GAMESETTINGS.BASE_MULTIPLIER *
        (timeSinceLastUpdate * (3600 + village_findOne_result.buildings.mill.level * 1400) / 86400);
      //(10000 + village_findOne_result.buildings.wheatfield.level * 200) -
          //vas
          village_findOne_result.buildings.warehouse.iron +=
            GAMESETTINGS.BASE_MULTIPLIER *
            (timeSinceLastUpdate *
              ((village_findOne_result.buildings.ironmine.level * 80) / 3600)) * templeMultiplier;

                    //templom morál
                    village_findOne_result.buildings.temple.moral -=
                    GAMESETTINGS.BASE_MULTIPLIER *
                    (timeSinceLastUpdate *
                      ((11 - village_findOne_result.buildings.temple.level) / 86400));

         

            //különleges anyagok random adása
            let d = Date.parse(village_findOne_result.buildings.warehouse.last_check)
            if((Date.parse(newdate)- d ) > 3600000)
            {
              let c_chance = village_findOne_result.buildings.warehouse.copper_chance * GAMESETTINGS.BASE_MULTIPLIER
              let s_chance = village_findOne_result.buildings.warehouse.silver_chance * GAMESETTINGS.BASE_MULTIPLIER
              let g_chance = village_findOne_result.buildings.warehouse.gold_chance * GAMESETTINGS.BASE_MULTIPLIER

              let current_g_chance = Math.floor(Math.random() * 10)
              let current_s_chance = Math.floor(Math.random() * 10) + 20
              let current_c_chance = Math.floor(Math.random() * 10) + 60


              const chance = Math.floor(Math.random() * 100)

              //copper

              if((c_chance + current_c_chance) >= chance)
              {
                //kapnak valamennyi copper-t/silver-t/goldot
                village_findOne_result.buildings.warehouse.copper += (village_findOne_result.buildings.ironmine.level * GAMESETTINGS.BASE_MULTIPLIER)
                village_findOne_result.buildings.warehouse.copper_chance = 0
              }
              else
              {
                village_findOne_result.buildings.warehouse.copper_chance += current_c_chance

              }
               //silver

               if((s_chance + current_s_chance) >= chance)
               {
                village_findOne_result.buildings.warehouse.silver += (village_findOne_result.buildings.ironmine.level * GAMESETTINGS.BASE_MULTIPLIER)
                village_findOne_result.buildings.warehouse.silver_chance = 0
               }
               else
               {
                village_findOne_result.buildings.warehouse.silver_chance += current_s_chance
               }
                //gold

              if((g_chance + current_g_chance) >= chance)
              {
                village_findOne_result.buildings.warehouse.gold += (village_findOne_result.buildings.ironmine.level * GAMESETTINGS.BASE_MULTIPLIER)
                village_findOne_result.buildings.warehouse.gold_chance = 0
              }
              else
              {
                village_findOne_result.buildings.warehouse.gold_chance += current_g_chance
              }
              village_findOne_result.buildings.warehouse.last_check = newdate
            }


            
         
          
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