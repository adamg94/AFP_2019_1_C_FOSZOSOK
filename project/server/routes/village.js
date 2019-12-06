const router = require('express').Router();
const request = require('request')
const Village = require('../schemas/village.schema')

const GAMESETTINGS = require('../village.config')
let newdate



//ez a metódus menti el a játék teljes állapotát a kilépéskor!!!!
//------------------------------------------------
router.route('/logout').post((req, res) => {
        const token = req.body.token;
        const username = req.body.username;
        request.post('http://localhost:5000/users/verify', {
            json: {
                token: token,
                username: username
            }
        }, (err1, req_res) => {
            if (err1) {
                console.log(`request.post() Error: '${err1}'!`);
                res.json({ "success": false, "message": `Server Error! 'v001'` });
                return;
            }

            if (req_res.body.success) {
                const uid = req_res.body.uid

                Village.findOne({ userId: uid }, (err2, village_findOne_result) => {
                    if (err2) {
                        console.log(`Village.findById() Error: '${err2}'!`);
                        res.json({ "success": false, "message": `Server Error! 'v002'` });
                        return;
                    }
                    if (village_findOne_result) {
                        request('http://localhost:5000/update/getdate', async function(err3, response, body) {

                            if (err3) {
                                console.log(`NTP Server call Error: '${err3}'!`);
                                res.json({ "success": false, "message": `Server Error! 'v003'` });
                                return;
                            }

                            /***
                             * 
                             * 
                             * ELŐZŐ BÁRMILYEN INTERAKCIÓ ÓTA ELTELT IDŐ ALAPJÁN KISZÁMOLJA A FRISSÍTENDŐ ADATOK MENNYISÉGÉT
                             * 
                             * 
                             */


                            newdate = JSON.parse(body).result
                            const timeSinceLastUpdate = parseFloat((Date.parse(newdate) - Date.parse(village_findOne_result.lastupdate)) / 1000)


                            //fa
                            village_findOne_result.buildings.warehouse.wood +=
                                (GAMESETTINGS.BASE_MULTIPLIER * (timeSinceLastUpdate *
                                    ((village_findOne_result.buildings.lumberyard.level * 80) / 3600)));

                            //agyag
                            village_findOne_result.buildings.warehouse.brick +=
                                (GAMESETTINGS.BASE_MULTIPLIER * (timeSinceLastUpdate *
                                    ((village_findOne_result.buildings.brickyard.level * 80) / 3600)));
                            //vas bár itt még mást is kell majd változtatni //TODO
                            village_findOne_result.buildings.warehouse.iron +=
                                (GAMESETTINGS.BASE_MULTIPLIER * (timeSinceLastUpdate *
                                    ((village_findOne_result.buildings.ironmine.level * 80) / 3600)));

                            village_findOne_result.lastupdate = newdate
                            let save_result = await village_findOne_result.save()
                                .then(
                                    _ => {
                                        res.json({
                                            "success": true,
                                            "username": req_res.body.username,
                                            "token": req_res.body.token
                                        });
                                        return;
                                    }

                                )
                                .catch((err) => console.log(err))

                        })
                    } else {
                        console.log(`VillageLogout Error!`);
                        res.json({ "success": false, "message": `Server Error! 'v013'` });
                        return;
                    }
                })
            } else {
                res.json({
                    "success": false,
                    "message": `You have no access to this operation!`
                })
            }
        })
    })
    //------------------------------------------------
router.route('/').post((req, res) => {
    const token = req.body.token;
    const username = req.body.username;
    request.post('http://localhost:5000/users/verify', {
        json: {
            token: token,
            username: username
        }
    }, (err7, req_res) => {
        if (err7) {
            console.log(`request.post() Error: '${err7}'!`);
            res.json({ "success": false, "message": `Server Error! 'v007'` });
            return;
        }

        if (req_res.body.success) {
            const uid = req_res.body.uid

            Village.findOne({ userId: uid }, (err8, village_findOne_result) => {
                if (err8) {
                    console.log(`Village.findById() Error: '${err8}'!`);
                    res.json({ "success": false, "message": `Server Error! 'v002'` });
                    return;
                }
                if (village_findOne_result) {
                    request('http://localhost:5000/update/getdate', async function(err11, response, body) {

                        if (err11) {
                            console.log(`NTP Server call Error: '${err11}'!`);
                            res.json({ "success": false, "message": `Server Error! 'v0011'` });
                            return;
                        }

                        /***
                         * 
                         * 
                         * ELŐZŐ KILÉPÉS ÓTA ELTELT IDŐ ALAPJÁN KISZÁMOLJA A FRISSÍTENDŐ ADATOK MENNYISÉGÉT
                         * 
                         * 
                         */


                        newdate = JSON.parse(body).result
                        const timeSinceLastUpdate = parseFloat((Date.parse(newdate) - Date.parse(village_findOne_result.lastupdate)) / 1000)



                        //fa
                        village_findOne_result.buildings.warehouse.wood +=
                            (GAMESETTINGS.BASE_MULTIPLIER * (timeSinceLastUpdate *
                                ((village_findOne_result.buildings.lumberyard.level * 80) / 3600)));

                        //agyag
                        village_findOne_result.buildings.warehouse.brick +=
                            (GAMESETTINGS.BASE_MULTIPLIER * (timeSinceLastUpdate *
                                ((village_findOne_result.buildings.brickyard.level * 80) / 3600)));
                        //vas bár itt még mást is kell majd változtatni //TODO
                        village_findOne_result.buildings.warehouse.iron +=
                            (GAMESETTINGS.BASE_MULTIPLIER * (timeSinceLastUpdate *
                                ((village_findOne_result.buildings.ironmine.level * 80) / 3600)));

                        village_findOne_result.lastupdate = newdate
                        let save_result = await village_findOne_result.save()
                            .then(
                                _ => {
                                    res.json({
                                        "success": true,
                                        "message": `Village loaded`,
                                        "villagename": village_findOne_result.name
                                    });
                                    return;
                                }

                            )
                            .catch(
                                (err12) => {
                                    console.log(`VillageSyncError: '${err12}'!`);
                                    res.json({ "success": false, "message": `Server Error! 'v012'` });
                                    return;

                                }
                            )

                    })

                } else {

                    request('http://localhost:5000/update/getdate', function(err11, response, body) {
                        if (err13) {
                            console.log(`NTP Server call Error: '${err13}'!`);
                            res.json({ "success": false, "message": `Server Error! 'v013'` });
                            return;
                        }
                        newdate = JSON.parse(body).result

                        const newVillage = new Village({
                            userId: uid,
                            lastupdate: newdate
                        });
                        newVillage.save((err12, newVillagesave_result) => {
                            if (err14) {
                                console.log(`newVillage.save() Error: '${err14}'!`);
                                res.json({ "success": false, "message": `Server Error! 'v014'` });
                                return;
                            }
                            res.json({
                                "success": true,
                                "message": 'Village registered!',
                                "villagename": newVillagesave_result.name
                            });
                        })

                    });

                }
            })
        } else {
            res.json({
                "success": false,
                "message": `You have no access to this operation!`
            })
        }
    })
});

module.exports = router;