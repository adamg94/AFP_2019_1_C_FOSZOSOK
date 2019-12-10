const router = require("express").Router();
const request = require("request");
const Village = require("../schemas/village.schema");

const GAMESETTINGS = require("../village.config");
let newdate;

//ez a metódus menti el a játék teljes állapotát a kilépéskor!!!!
//------------------------------------------------
router.route("/logout").post((req, res) => {
  const token = req.body.token;
  const username = req.body.username;
  request.post(
    "http://localhost:5000/users/verify",
    {
      json: {
        token: token,
        username: username
      }
    },
    (err1, req_res) => {
      if (err1) {
        console.log(`request.post() Error: '${err1}'!`);
        res.json({ success: false, message: `Server Error! 'v001'` });
        return;
      }

      if (req_res.body.success) {
        const uid = req_res.body.uid;

        request.post(
          "http://localhost:5000/update/villageupdate",
          {
            json: {
              userId: uid
            }
          },
          (err2, req_update_res) => {
            if (err2) {
              console.log(`request.post()VillageUpdate Error: '${err2}'!`);
              res.json({ success: false, message: `Server Error! 'v002'` });
              return;
            }
            res.json({
              success: req_update_res.body.success,
              username: req_res.body.username,
              token: req_res.body.token,
              message: req_update_res.body.message
            });
            return;
          }
        );
      } else {
        res.json({
          success: false,
          message: `You have no access to this operation!`
        });
      }
    }
  );
});
//------------------------------------------------
router.route("/").post((req, res) => {
  const token = req.body.token;
  const username = req.body.username;
  request.post(
    "http://localhost:5000/users/verify",
    {
      json: {
        token: token,
        username: username
      }
    },
    (err7, req_res) => {
      if (err7) {
        console.log(`request.post() Error: '${err7}'!`);
        res.json({ success: false, message: `Server Error! 'v007'` });
        return;
      }

      if (req_res.body.success) {
        const uid = req_res.body.uid;

        request.post(
          "http://localhost:5000/update/villageupdate",
          {
            json: {
              userId: uid
            }
          },
          (err2, req_update_res) => {
            if (err2) {
              console.log(`request.post()VillageUpdate Error: '${err2}'!`);
              res.json({ success: false, message: `Server Error! 'v002'` });
              return;
            }

            if (req_update_res.body.success) {
              res.json({
                success: req_update_res.body.success,
                username: req_res.body.username,
                token: req_res.body.token,
                message: req_update_res.body.message,
                village: req_update_res.body.village
              });
              return;
            } else {
              request("http://localhost:5000/update/getdate", function(
                err13,
                response,
                body
              ) {
                if (err13) {
                  console.log(`NTP Server call Error: '${err13}'!`);
                  res.json({ success: false, message: `Server Error! 'v013'` });
                  return;
                }
                newdate = JSON.parse(body).result;

                const newVillage = new Village({
                  userId: uid,
                  lastupdate: newdate
                });
                newVillage.buildings.warehouse.last_check = newdate;
                newVillage.save((err14, newVillagesave_result) => {
                  if (err14) {
                    console.log(`newVillage.save() Error: '${err14}'!`);
                    res.json({
                      success: false,
                      message: `Server Error! 'v014'`
                    });
                    return;
                  }

                  res.json({
                    success: true,
                    message: "Village registered!",
                    village: newVillagesave_result
                  });
                });
              });
            }
          }
        );
      } else {
        res.json({
          success: false,
          message: `You have no access to this operation!`
        });
      }
    }
  );
});
router.route("/getinfo").post((req, res) => {
  const token = req.body.token;
  const username = req.body.username;
  request.post(
    "http://localhost:5000/users/verify",
    {
      json: {
        token: token,
        username: username
      }
    },
    (err7, req_res) => {
      if (err7) {
        console.log(`request.post() Error: '${err7}'!`);
        res.json({ success: false, message: `Server Error! 'v007'` });
        return;
      }

      if (req_res.body.success) {
        const uid = req_res.body.uid;

        request.post(
          "http://localhost:5000/update/villageupdate",
          {
            json: {
              userId: uid
            }
          },
          (err2, req_update_res) => {
            if (err2) {
              console.log(`request.post()VillageUpdate Error: '${err2}'!`);
              res.json({ success: false, message: `Server Error! 'v002'` });
              return;
            }

            if (req_update_res.body.success) {
              res.json({
                success: req_update_res.body.success,
                username: req_res.body.username,
                token: req_res.body.token,
                message: req_update_res.body.message,
                village: req_update_res.body.village
              });
              return;
            } else {
              res.json({
                success: false,
                message: `You don't have a village O.o! ` //ennek soha nem kéne lefutnia.
              });
              return;
            }
          }
        );
      } else {
        res.json({
          success: false,
          message: `You have no access to this operation!`
        });
      }
    }
  );
});

router.route("/miseStart").post((req, res) => {
  const token = req.body.token;
  const username = req.body.username;
  request.post(
    "http://localhost:5000/users/verify",
    {
      json: {
        token: token,
        username: username
      }
    },
    (err7, req_res) => {
      if (err7) {
        console.log(`request.post() Error: '${err7}'!`);
        res.json({ success: false, message: `Server Error! 'v007'` });
        return;
      }

      if (req_res.body.success) {
        const uid = req_res.body.uid;

        request.post(
          "http://localhost:5000/update/villageupdate",
          {
            json: {
              userId: uid
            }
          },
          (err2, req_update_res) => {
            if (err2) {
              console.log(`request.post()VillageUpdate Error: '${err2}'!`);
              res.json({ success: false, message: `Server Error! 'v002'` });
              return;
            }

            if (req_update_res.body.success) {
              Village.findOne(
                { _id: req_update_res.body.villageId },
                async (err3, foundVillage) => {
                  if (err3) {
                    console.log(`Village findOne error: '${err3}'!`);
                    res.json({
                      success: false,
                      message: `Server Error! 'v002'`
                    });
                    return;
                  }
                  let ezkell = Date.parse(foundVillage.buildings.temple.last_mise)
                  if(ezkell!= null 
                    && ezkell + (7800000 - 600000 * foundVillage.buildings.temple.level) <= req_update_res.body.currentdatentp ){
                      res.json({
                      success: false,
                      message: "You can't start a mise yet",
                      })
                      return;
                    }
                  foundVillage.buildings.temple.mise_started =
                    req_update_res.body.currentdatentp;
                    foundVillage.buildings.temple.last_mise =
                    Date.parse(req_update_res.body.currentdatentp) + 7200000;
                  foundVillage.buildings.temple.mise_ends =
                    Date.parse(req_update_res.body.currentdatentp) + 7200000;
                  let save_result = await foundVillage
                    .save()
                    .then(_ => {
                      res.json({
                        currentdatentp:
                          foundVillage.buildings.temple.mise_started,
                        success: true,
                        message: "Village Updated",
                        village: foundVillage
                      });
                      return;
                    })
                    .catch(err => console.log(err));
                }
              );
            } else {
              res.json({
                success: false,
                message: `You don't have a village O.o! ` //ennek soha nem kéne lefutnia.
              });
              return;
            }
          }
        );
      } else {
        res.json({
          success: false,
          message: `You have no access to this operation!`
        });
      }
    }
  );
});

router.route("/palacenormalupgrade").post((req, res) => {
  const token = req.body.token;
  const username = req.body.username;
  const id = req.body.buildingId;
  request.post(
    "http://localhost:5000/users/verify",
    {
      json: {
        token: token,
        username: username
      }
    },
    (err7, req_res) => {
      if (err7) {
        console.log(`request.post() Error: '${err7}'!`);
        res.json({ success: false, message: `Server Error! 'v007'` });
        return;
      }

      if (req_res.body.success) {
        const uid = req_res.body.uid;

        request.post(
          "http://localhost:5000/update/villageupdate",
          {
            json: {
              userId: uid
            }
          },
          (err8, req_update_res) => {
            if (err8) {
              console.log(`request.post()VillageUpdate Error: '${err8}'!`);
              res.json({ success: false, message: `Server Error! 'v008'` });
              return;
            }

            if (req_update_res.body.success) {
              Village.findById(
                { _id: req_update_res.body.villageId },
                async (err9, findByResult) => {
                  if (err9) {
                    console.log(`Village.findById Error: '${err9}'!`);
                    res.json({
                      success: false,
                      message: `Server Error! 'v009'`
                    });
                    return;
                  }
                  let building;
                  switch (parseInt(id)) {
                    case 1:
                      building = findByResult.buildings.palace;
                      break;
                    case 2:
                      building = findByResult.buildings.merch;
                      break;
                    case 3:
                      building = findByResult.buildings.merchworkshop;
                      break;
                    case 4:
                      building = findByResult.buildings.temple;
                      break;
                    case 5:
                      building = findByResult.buildings.wall;
                      break;
                    case 6:
                      building = findByResult.buildings.warehouse;
                      break;
                    case 7:
                      building = findByResult.buildings.hideout;
                      break;
                    case 8:
                      building = findByResult.buildings.statue;
                      break;
                    case 9:
                      building = findByResult.buildings.metalfurnace;
                      break;
                    case 10:
                      building = findByResult.buildings.mill;
                      break;
                    case 11:
                      building = findByResult.buildings.wheatfield;
                      break;
                    case 12:
                      building = findByResult.buildings.ironmine;
                      break;
                    case 13:
                      building = findByResult.buildings.brickyard;
                      break;
                    case 14:
                      building = findByResult.buildings.lumberyard;
                      break;
                    default:
                      break;
                  }

                  let constructionTime;
                  let constructionPrice;
                  if(id == 1) {
                    if (building.level > 0 && building.level <= 20) {
                      constructionTime =
                        building.level * 5
                      constructionPrice = building.level * 50;
                    } else if (building.level > 20 && building.level <= 40) {
                      constructionTime =
                        building.level * 10
                      constructionPrice = building.level * 500;
                    } else {
                      constructionTime =
                        building.level * 20
                      constructionPrice = building.level * 5000;
                    }
                  }
                  else{
                  if (building.maxlevel == 50) {
                    if (building.level > 0 && building.level <= 20) {
                      constructionTime =
                        building.level * 5 -
                        building.level *
                          5 *
                          (findByResult.buildings.palace.level / 100);
                      constructionPrice = building.level * 50;
                    } else if (building.level > 20 && building.level <= 40) {
                      constructionTime =
                        building.level * 10 -
                        building.level *
                          10 *
                          (findByResult.buildings.palace.level / 100);
                      constructionPrice = building.level * 500;
                    } else {
                      constructionTime =
                        building.level * 20 -
                        building.level *
                          20 *
                          (findByResult.buildings.palace.level / 100);
                      constructionPrice = building.level * 5000;
                    }
                  }
                  else if(building.maxlevel == 30)
                  {
                    if (building.level > 0 && building.level <= 10) {
                      constructionTime =
                        building.level * 5 -
                        building.level *
                          5 *
                          (findByResult.buildings.palace.level / 100);
                      constructionPrice = building.level * 100;
                    } else if (building.level > 10 && building.level <= 20) {
                      constructionTime =
                        building.level * 10 -
                        building.level *
                          10 *
                          (findByResult.buildings.palace.level / 100);
                      constructionPrice = building.level * 1000;
                    } else {
                      constructionTime =
                        building.level * 20 -
                        building.level *
                          20 *
                          (findByResult.buildings.palace.level / 100);
                      constructionPrice = building.level * 10000;
                    }
                  }
                  else if(building.maxlevel == 10)
                  {
                    if (building.level > 0 && building.level <= 3) {
                      constructionTime =
                        building.level * 5 -
                        building.level *
                          5 *
                          (findByResult.buildings.palace.level / 100);
                      constructionPrice = building.level * 2500;
                    } else if (building.level > 3 && building.level <= 6) {
                      constructionTime =
                        building.level * 10 -
                        building.level *
                          10 *
                          (findByResult.buildings.palace.level / 100);
                      constructionPrice = building.level * 5000;
                    } else {
                      constructionTime =
                        building.level * 20 -
                        building.level *
                          20 *
                          (findByResult.buildings.palace.level / 100);
                      constructionPrice = building.level * 10000;
                    }
                    
                  }
                  else if(building.maxlevel == 1)
                  {
                    constructionTime = 4000 * (findByResult.buildings.palace.level / 100)
                    constructionPrice = 500000
                    
                  }
                }
                  
                let lumber = findByResult.buildings.warehouse.wood
                let brick = findByResult.buildings.warehouse.brick
                let iron = findByResult.buildings.warehouse.iron
                let wheat = findByResult.buildings.warehouse.wheat
               
                if((lumber - constructionPrice) >= 0
                  && (brick - constructionPrice) >= 0
                  && (iron - constructionPrice) >= 0
                  && (wheat - (constructionPrice/10)) >=0)
                {
                  




                  findByResult.buildings.warehouse.wood -= constructionPrice
                  findByResult.buildings.warehouse.brick -= constructionPrice
                  findByResult.buildings.warehouse.iron -= constructionPrice
                  findByResult.buildings.warehouse.wheat -= constructionPrice/10

                  let save_result = await findByResult
                  .save()
                  .then(_ => {
                    res.json({
                      success: true,
                      message: "Building started!",
                      village: findByResult,
                      currentdatentp: newdate
                    });




                  //csatlakozni a construction táblához és beleirni a dolgokat.








                    return;
                  })
                  .catch(err => console.log(err));





                }
                else
                {
                  res.json({
                    success: false,
                    message: "Not enough resource"
                  });
                  console.log("Price/resource: " + constructionPrice);
                  console.log("Time(minutes): " + constructionTime);
                }


                
               


    
                }
              );

              
            } else {
              res.json({
                success: false,
                message: `You don't have a village O.o! ` //ennek soha nem kéne lefutnia.
              });
              return;
            }
          }
        );
      } else {
        res.json({
          success: false,
          message: `You have no access to this operation!`
        });
      }
    }
  );
});
router.route("/palacerareupgrade").post((req, res) => {
  const token = req.body.token;
  const username = req.body.username;
  const id = req.body.buildingId;
  request.post(
    "http://localhost:5000/users/verify",
    {
      json: {
        token: token,
        username: username
      }
    },
    (err7, req_res) => {
      if (err7) {
        console.log(`request.post() Error: '${err7}'!`);
        res.json({ success: false, message: `Server Error! 'v007'` });
        return;
      }

      if (req_res.body.success) {
        const uid = req_res.body.uid;

        request.post(
          "http://localhost:5000/update/villageupdate",
          {
            json: {
              userId: uid
            }
          },
          (err2, req_update_res) => {
            if (err2) {
              console.log(`request.post()VillageUpdate Error: '${err2}'!`);
              res.json({ success: false, message: `Server Error! 'v002'` });
              return;
            }

            if (req_update_res.body.success) {
              ////////////
              console.log("rare");
              console.log(req.body);
              res.json({
                success: true,
                message: "REQUEST RARE"
              });
            } else {
              res.json({
                success: false,
                message: `You don't have a village O.o! ` //ennek soha nem kéne lefutnia.
              });
              return;
            }
          }
        );
      } else {
        res.json({
          success: false,
          message: `You have no access to this operation!`
        });
      }
    }
  );
});

module.exports = router;
