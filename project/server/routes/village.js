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

module.exports = router;
