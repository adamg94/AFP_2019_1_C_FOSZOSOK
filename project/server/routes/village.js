const router = require('express').Router();
const request = require('request')
const Village = require('../schemas/village.schema')


router.route('/').post((req, res) => {
    const token = req.body.token;
    const username = req.body.username;
    request.post('http://localhost:5000/users/verify',
   {
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
    
    if(req_res.body.success)
    {
        const uid = req_res.body.uid
        
        Village.findOne({ userId : uid }, (err2, village_findOne_result) => {
            if (err2) {
                console.log(`Village.findById() Error: '${err2}'!`);
                res.json({ "success": false, "message": `Server Error! 'v002'` });
                return;
            }
            if(village_findOne_result)
            {
                res.json({ 
                    "success": true,
                    "message": `Village loaded`,
                    "villagename": village_findOne_result.name });
                return;
                
            }
            else{
                const newVillage = new Village({
                    userId : uid
                });
                newVillage.save((err3, newVillagesave_result) => {
                    if (err3) {
                        console.log(`newVillage.save() Error: '${err3}'!`);
                        res.json({ "success": false, "message": `Server Error! 'v003'` });
                        return;
                    }
                    res.json({
                        "success": true,
                        "message": 'Village registered!',
                        "villagename" : newVillagesave_result.name
                    });
                })
            }
        })
    }
    else{
        res.json({
            "success" : false,
            "message" : `You have no access to this operation!`
        })
    }
   })
});

module.exports = router;
