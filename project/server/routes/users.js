const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../schemas/user.schema')
const UserSession = require('../schemas/userSession.schema')
const salt = 10



///REGISTER OR LOGIN METHOD
router.route('/').post((req, res) => {
    
    const username = req.body.username
    const password = req.body.password
    const lastLogin = Date.now()
    if(username.length < 5)
    {
        console.log(`users/ -> username.length < 5 error!`)
        res.json({"success" : false, "message" : `Username length can't be lower than five!`})
        return
    }
    if(password.length < 1)
    {
        console.log(`users/ -> password.length < 1 error!`)
        res.json({"success" : false, "message" : `Password empty!`})
        return
    }
    User.exists({username : username}, (err, result) => {
        if(err)
        {
            console.log(`User.exists() Error: '${err}'!`)
            res.json({"success" : false, "message" : `Server Error! '001'`})
            return
        }
        if(result)
        {
            User.findOne({ username : username }, (err2, findOne_result) => {
                if(err2)
                {
                    console.log(`User.findOne() Error: '${err2}'!`)
                    res.json({"success" : false, "message" : `Server Error! '002'`})
                    return
                }
                if(findOne_result === null)
                {
                    console.log(`User.findOne() returned null! username: '${username}'!`)
                    res.json({"success" : false, "message" : `'${username}' doesn't exist!`})
                    return
                }
                bcrypt.compare(password, findOne_result.password, (err3, bcrypt_result) => {
                    if(err3)
                    {
                        console.log(`bcrypt.compare() Error: '${err3}'!`)
                        res.json({"success" : false, "message" : `Server Error! '003'`})
                        return
                    }
                    if(bcrypt_result)
                    {
                        let Session = new UserSession({
                            userId : findOne_result._id
                        })

                        Session.save((err4, session_result) => {
                            if(err4)
                            {
                                console.log(`Session.save() Error: '${err4}'!`)
                                res.json({"success" : false, "message" : `Server Error! '004'`})
                                return
                            }
                            findOne_result.updateOne({ lastlogin : lastLogin }, (err5, update_result) => {
                                if(err5)
                                {
                                    console.log(`findOne_result.updateOne() Error: '${err5}'!`)
                                    res.json({"success" : false, "message" : `Server Error! '005'`})
                                    return
                                }
                                res.json({
                                    "success" : true,
                                    "message" : "Logined!",
                                    "token" : session_result._id,
                                    "username" : findOne_result.username
                                })
                            })
                        })
                    }
                    else
                    {
                        console.log(`bcrypt.compare() '${username}' bad pasword!:!`)
                        res.json({"success" : false, "message" : `Wrong credentials!`})
                        return
                    }
                })
            })
        }
        else
        {
            const regdate = Date.now()
            bcrypt.genSalt(salt,  (err6, salt_result) => {
                if(err6)
                {
                    console.log(`bcrypt.genSalt() Error: '${err6}'!`)
                    res.json({"success" : false, "message" : `Server Error! '006'`})
                    return
                }
                bcrypt.hash(password, salt_result, (err7, hashedPassword) => {
                    if(err7)
                    {
                        console.log(`bcrypt.hash() Error: '${err7}'!`)
                        res.json({"success" : false, "message" : `Server Error! '007'`})
                        return
                    }
                    const newUser = new User({
                        username : username,
                        password : hashedPassword,
                        regdate : regdate,
                        lastlogin : lastLogin
                    })
                    newUser.save((err8, save_result) =>{
                        if(err8)
                        {
                            console.log(`newUser.save() Error: '${err8}'!`)
                            res.json({"success" : false, "message" : `Server Error! '008'`})
                            return
                        }
                        res.json({
                            "success" : true,
                            "message" : "Registered!",
                            "username" : username
                        })
                    })
                })
            })
        }
    })
})
module.exports = router