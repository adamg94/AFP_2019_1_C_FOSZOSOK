const router = require("express").Router();
const request = require("request");
const Village = require("../schemas/village.schema");
const Construct = require("../schemas/constructions")
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


          






          let morelLevel = village_findOne_result.buildings.temple.moral;
          GAMESETTINGS.TEMPLE_MULTIPLIER = morelLevel;
          if (GAMESETTINGS.TEMPLE_MULTIPLIER >= 75) {
            GAMESETTINGS.TEMPLE_MULTIPLIER = 1.2;
          } else if (GAMESETTINGS.TEMPLE_MULTIPLIER <= 25) {
            GAMESETTINGS.TEMPLE_MULTIPLIER = 0.8;
          } else {
            GAMESETTINGS.TEMPLE_MULTIPLIER = 1;
          }

          let maxMaterialHid = village_findOne_result.buildings.hideout.level * 3000;
          let maxStoneHid;
          let maxGoldHid;
          if(village_findOne_result.buildings.hideout.level == 1){
            maxStoneHid = 200;
            maxGoldHid = 20;
          }
          else{
            maxStoneHid = village_findOne_result.hideout.level * 714 + 200;
            maxGoldHid = village_findOne_result.hideout.level * 102 + 20;
          }


          let maxMaterial =
            village_findOne_result.buildings.warehouse.level * 10000;

          if(village_findOne_result.buildings.statue.level > 0){
            maxMaterial = (village_findOne_result.buildings.warehouse.level * 10000) * 1.25;
            maxMaterialHid = (village_findOne_result.buildings.hideout.level * 3000) * 1.30;
          }

          let maxStone;
          let maxGold;
          if(village_findOne_result.buildings.warehouse.level == 1){
            maxStone = 700;
            maxGold = 300;
          } else{
            maxStone = village_findOne_result.buildings.warehouse.level * 5986 + 700,
						maxGold = village_findOne_result.buildings.warehouse.level * 1994 + 300
          }

          if(village_findOne_result.buildings.warehouse.stone > maxStone){
            village_findOne_result.buildings.warehouse.stone = maxStone;
          } 
          if(village_findOne_result.buildings.warehouse.metal > maxStone){
            village_findOne_result.buildings.warehouse.metal = maxStone;
          }

          newdate = JSON.parse(body).result;
          const timeSinceLastUpdate = parseFloat(
            (Date.parse(newdate) -
              Date.parse(village_findOne_result.lastupdate)) /
              1000
          );

          //fa

            //hideout
          village_findOne_result.buildings.hideout.wood +=
          GAMESETTINGS.STATUE_MULTIPLIER*(
          GAMESETTINGS.BASE_MULTIPLIER *
          (timeSinceLastUpdate *
            ((village_findOne_result.buildings.lumberyard.level * 80) /
              3600)) *
          GAMESETTINGS.TEMPLE_MULTIPLIER)

        if (village_findOne_result.buildings.hideout.wood > maxMaterialHid) {
          village_findOne_result.buildings.hideout.wood = maxMaterialHid;
        }



          //warehouse
          village_findOne_result.buildings.warehouse.wood +=
            GAMESETTINGS.STATUE_MULTIPLIER*(
            GAMESETTINGS.BASE_MULTIPLIER *
            (timeSinceLastUpdate *
              ((village_findOne_result.buildings.lumberyard.level * 80) /
                3600)) *
            GAMESETTINGS.TEMPLE_MULTIPLIER);

          if (village_findOne_result.buildings.warehouse.wood > maxMaterial) {
            village_findOne_result.buildings.warehouse.wood = maxMaterial;
          }

          //agyag

           //hideout
           village_findOne_result.buildings.hideout.brick +=
           GAMESETTINGS.STATUE_MULTIPLIER*(
           GAMESETTINGS.BASE_MULTIPLIER *
           (timeSinceLastUpdate *
             ((village_findOne_result.buildings.brickyard.level * 80) /
               3600)) *
           GAMESETTINGS.TEMPLE_MULTIPLIER);

         if (village_findOne_result.buildings.hideout.brick > maxMaterialHid) {
           village_findOne_result.buildings.hideout.brick = maxMaterialHid;
         }

          //warehouse
          village_findOne_result.buildings.warehouse.brick +=
            GAMESETTINGS.STATUE_MULTIPLIER*(
            GAMESETTINGS.BASE_MULTIPLIER *
            (timeSinceLastUpdate *
              ((village_findOne_result.buildings.brickyard.level * 80) /
                3600)) *
            GAMESETTINGS.TEMPLE_MULTIPLIER);

          if (village_findOne_result.buildings.warehouse.brick > maxMaterial) {
            village_findOne_result.buildings.warehouse.brick = maxMaterial;
          }

          //búza

          //hideout
          village_findOne_result.buildings.hideout.wheat +=
            GAMESETTINGS.STATUE_MULTIPLIER*(
            GAMESETTINGS.BASE_MULTIPLIER *
            ((timeSinceLastUpdate *
              (3600 + village_findOne_result.buildings.mill.level * 1400)) /
              86400));

          if (village_findOne_result.buildings.hideout.wheat > maxMaterialHid) {
            village_findOne_result.buildings.hideout.wheat = maxMaterialHid;
          }


          //warehouse
          village_findOne_result.buildings.warehouse.wheat +=
            GAMESETTINGS.STATUE_MULTIPLIER*(
            GAMESETTINGS.BASE_MULTIPLIER *
            ((timeSinceLastUpdate *
              (3600 + village_findOne_result.buildings.mill.level * 1400)) /
              86400));

          if (village_findOne_result.buildings.warehouse.wheat > maxMaterial) {
            village_findOne_result.buildings.warehouse.wheat = maxMaterial;
          }

          //(10000 + village_findOne_result.buildings.wheatfield.level * 200) -
          //vas

          //hideout
          village_findOne_result.buildings.hideout.iron +=
            GAMESETTINGS.STATUE_MULTIPLIER*(
            GAMESETTINGS.BASE_MULTIPLIER *
            (timeSinceLastUpdate *
              ((village_findOne_result.buildings.ironmine.level * 80) / 3600)) *
            GAMESETTINGS.TEMPLE_MULTIPLIER);

          if (village_findOne_result.buildings.hideout.iron > maxMaterialHid) {
            village_findOne_result.buildings.hideout.iron = maxMaterialHid;
          }

          //warehouse
          village_findOne_result.buildings.warehouse.iron +=
            GAMESETTINGS.STATUE_MULTIPLIER*(
            GAMESETTINGS.BASE_MULTIPLIER *
            (timeSinceLastUpdate *
              ((village_findOne_result.buildings.ironmine.level * 80) / 3600)) *
            GAMESETTINGS.TEMPLE_MULTIPLIER);

          if (village_findOne_result.buildings.warehouse.iron > maxMaterial) {
            village_findOne_result.buildings.warehouse.iron = maxMaterial;
          }

          //templom morál
          village_findOne_result.buildings.temple.moral -=
            GAMESETTINGS.STATUE_MULTIPLIER*(
            GAMESETTINGS.BASE_MULTIPLIER *
            (timeSinceLastUpdate *
              ((72) / 86400)));
              if(village_findOne_result.buildings.temple.moral < 1){
                village_findOne_result.buildings.temple.moral = 0
              }
          let datum = Date.parse(
            village_findOne_result.buildings.temple.mise_ends
          );
          /*console.log(7800000 - 600000 * village_findOne_result.buildings.temple.level)
          console.log(Date.parse(newdate))
          console.log(datum)
          console.log(Date.parse(newdate) - datum)*/
          if (Date.parse(newdate) - datum > 780000 - 600000 * village_findOne_result.buildings.temple.level) { 
            village_findOne_result.buildings.temple.last_mise = village_findOne_result.buildings.temple.mise_ends;
            village_findOne_result.buildings.temple.moral += 30;
            if(village_findOne_result.buildings.temple.moral > 100){
              village_findOne_result.buildings.temple.moral = 100
            }
            village_findOne_result.buildings.temple.mise_ends = null;
            village_findOne_result.buildings.temple.mise_started = null;
          }

          //különleges anyagok random adása
          let d = Date.parse(
            village_findOne_result.buildings.warehouse.last_check
          );
          if (Date.parse(newdate) - d > 3600000) {
            let c_chance =
              village_findOne_result.buildings.warehouse.copper_chance *
              GAMESETTINGS.BASE_MULTIPLIER;
            let s_chance =
              village_findOne_result.buildings.warehouse.silver_chance *
              GAMESETTINGS.BASE_MULTIPLIER;
            let g_chance =
              village_findOne_result.buildings.warehouse.gold_chance *
              GAMESETTINGS.BASE_MULTIPLIER;

            let current_g_chance = Math.floor(Math.random() * 10);
            let current_s_chance = Math.floor(Math.random() * 10) + 20;
            let current_c_chance = Math.floor(Math.random() * 10) + 60;

            const chance = Math.floor(Math.random() * 100);

            //copper

            if (c_chance + current_c_chance >= chance) {
              //kapnak valamennyi copper-t/silver-t/goldot
              village_findOne_result.buildings.warehouse.copper +=
                village_findOne_result.buildings.ironmine.level *
                GAMESETTINGS.BASE_MULTIPLIER;
              village_findOne_result.buildings.warehouse.copper_chance = 0;
            } else {
              village_findOne_result.buildings.warehouse.copper_chance += current_c_chance;
            }
            if(village_findOne_result.buildings.warehouse.copper > maxGold){
              village_findOne_result.buildings.warehouse.copper = maxGold;
            }
            //silver

            if (s_chance + current_s_chance >= chance) {
              village_findOne_result.buildings.warehouse.silver +=
                village_findOne_result.buildings.ironmine.level *
                GAMESETTINGS.BASE_MULTIPLIER;
              village_findOne_result.buildings.warehouse.silver_chance = 0;
            } else {
              village_findOne_result.buildings.warehouse.silver_chance += current_s_chance;
            }
            if(village_findOne_result.buildings.warehouse.silver > maxGold){
              village_findOne_result.buildings.warehouse.silver = maxGold;
            }
            //gold

            if (g_chance + current_g_chance >= chance) {
              village_findOne_result.buildings.warehouse.gold +=
                village_findOne_result.buildings.ironmine.level *
                GAMESETTINGS.BASE_MULTIPLIER;
              village_findOne_result.buildings.warehouse.gold_chance = 0;
            } else {
              village_findOne_result.buildings.warehouse.gold_chance += current_g_chance;
            }
            village_findOne_result.buildings.warehouse.last_check = newdate;
          }
          if(village_findOne_result.buildings.warehouse.gold > maxGold){
            village_findOne_result.buildings.warehouse.gold = maxGold;
          }
          if(village_findOne_result.buildings.warehouse.silver > maxGold){
            village_findOne_result.buildings.warehouse.silver = maxGold;
          }
          if(village_findOne_result.buildings.warehouse.copper > maxGold){
            village_findOne_result.buildings.warehouse.copper = maxGold;
          }

          village_findOne_result.lastupdate = newdate;
          let save_result = await village_findOne_result
            .save()
            .then(_ => {
              res.json({
                success: true,
                message: "Village Updated",
                village: village_findOne_result,
                currentdatentp: newdate,
                villageId: village_findOne_result._id
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
