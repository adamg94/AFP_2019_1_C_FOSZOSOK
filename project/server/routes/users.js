const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../schemas/user.schema');
const UserSession = require('../schemas/userSession.schema');
const salt = 10;

///REGISTER OR LOGIN METHOD
router.route('/').post((req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	const lastLogin = Date.now();
	if (username.length < 5) {
		console.log(`users/ -> username.length < 5 error!`);
		res.json({ success: false, message: `Username length can't be lower than five!` });
		return;
	}
	if (password.length < 1) {
		console.log(`users/ -> password.length < 1 error!`);
		res.json({ success: false, message: `Password empty!` });
		return;
	}
	User.exists({ username: username }, (err, result) => {
		if (err) {
			console.log(`User.exists() Error: '${err}'!`);
			res.json({ success: false, message: `Server Error! '001'` });
			return;
		}
		if (result) {
			User.findOne({ username: username }, (err2, findOne_result) => {
				if (err2) {
					console.log(`User.findOne() Error: '${err2}'!`);
					res.json({ success: false, message: `Server Error! '002'` });
					return;
				}
				if (findOne_result === null) {
					console.log(`User.findOne() returned null! username: '${username}'!`);
					res.json({ success: false, message: `'${username}' doesn't exist!` });
					return;
				}
				bcrypt.compare(password, findOne_result.password, (err3, bcrypt_result) => {
					if (err3) {
						console.log(`bcrypt.compare() Error: '${err3}'!`);
						res.json({ success: false, message: `Server Error! '003'` });
						return;
					}
					if (bcrypt_result) {
						let Session = new UserSession({
							userId: findOne_result._id
						});

						Session.save((err4, session_result) => {
							if (err4) {
								console.log(`Session.save() Error: '${err4}'!`);
								res.json({ success: false, message: `Server Error! '004'` });
								return;
							}
							findOne_result.updateOne({ lastlogin: lastLogin }, (err5, update_result) => {
								if (err5) {
									console.log(`findOne_result.updateOne() Error: '${err5}'!`);
									res.json({ success: false, message: `Server Error! '005'` });
									return;
								}
								res.json({
									success: true,
									message: 'Logined!',
									token: session_result._id,
									username: findOne_result.username,
									exitCode: 0
								});
							});
						});
					} else {
						console.log(`bcrypt.compare() '${username}' bad pasword!`);
						res.json({ success: false, message: `Wrong credentials!` });
						return;
					}
				});
			});
		} else {
			const regdate = Date.now();
			bcrypt.genSalt(salt, (err6, salt_result) => {
				if (err6) {
					console.log(`bcrypt.genSalt() Error: '${err6}'!`);
					res.json({ success: false, message: `Server Error! '006'` });
					return;
				}
				bcrypt.hash(password, salt_result, (err7, hashedPassword) => {
					if (err7) {
						console.log(`bcrypt.hash() Error: '${err7}'!`);
						res.json({ success: false, message: `Server Error! '007'` });
						return;
					}
					const newUser = new User({
						username: username,
						password: hashedPassword,
						regdate: regdate,
						lastlogin: lastLogin
					});
					newUser.save((err8, save_result) => {
						if (err8) {
							console.log(`newUser.save() Error: '${err8}'!`);
							res.json({ success: false, message: `Server Error! '008'` });
							return;
						}
						res.json({
							success: true,
							message: 'Registered!',
							username: username,
							exitCode: 1
						});
					});
				});
			});
		}
	});
});

router.route('/logout').post((req, res) => {
	const username = req.body.username;
	const token = req.body.token;

	User.findOne({ username: username }, (err9, logoutfindOne_result) => {
		if (err9) {
			console.log(`User.findOne Error: '${err9}'!`);
			res.json({ success: false, message: `Server Error! '009'` });
			return;
		}
		if (logoutfindOne_result === null) {
			console.log(`User.findOne() returned null! username: '${username}'!`);
			res.json({ success: false, message: `'${username}' doesn't exist!` });
			return;
		}
		const userId = logoutfindOne_result._id;
		UserSession.findOne({ userId: userId, isDeleted: false }, (err10, usessionfindOne_result) => {
			if (err10) {
				console.log(`UserSession.findOne Error: '${err10}'!`);
				res.json({ success: false, message: `Server Error! '010'` });
				return;
			}

			if (usessionfindOne_result === null) {
				console.log(`UserSession.findOne() returned null! userId: '${userId}'!`);
				res.json({ success: false, message: `Session doesn't exist!` });
				return;
			}
			const tokenFromDb = usessionfindOne_result._id;
			if (tokenFromDb != token) {
				console.log(`Client and Server session ID mismatch: ${tokenFromDb} <> ${token}!`);
				res.json({ success: false, message: `Wrong session!` });
				return;
			} else {
				usessionfindOne_result.updateOne(
					{
						isDeleted: true
					},
					(err11, usessionUpdateResult) => {
						if (err10) {
							console.log(`UserSession.updateOne Error: '${err11}'!`);
							res.json({ success: false, message: `Server Error! '011'` });
							return;
						} else {
							res.json({
								success: true
							});
						}
					}
				);
			}
		});
	});
});
router.route("/verify").post((req, res) => {
	const username = req.body.username;
	const token = req.body.token;
	User.findOne({ username : username }, (err12, findOne_result) => {
		if (err12) {
			console.log(`User.findOne Error: '${err12}'!`);
			res.json({ success: false, message: `Server Error! '012'` });
			return;
		}
		if(findOne_result === null)
		{
			console.log(`User doesn't exist error!`);
			res.json({ success: false, message: `Server Error!` });
			return;
		}
		const userId = findOne_result._id;
		UserSession.findOne({ userId : userId, isDeleted : false }, (err13, usessionfindOne_result) => {
			if (err13) {
				console.log(`UserSession.findOne Error: '${err13}'!`);
				res.json({ success: false, message: `Server Error! '013'` });
				return;
			}
			if(usessionfindOne_result == null)
			{
				console.log(`UserSession doesn't exist error!`);
				res.json({ success: false, message: `Server Error!` });
				return;
			}
			const sessionId = usessionfindOne_result._id;
			if(token != sessionId)
			{
				console.log(`Session mismatch! ${sessionId} <-> ${token}`);
				res.json({ success: false, message: `Session mismatch!` });
				return;
			}
			console.log("Session OK")
			res.json({ success: true, message: `Session ok!` });
			return;
		})
	})
});
module.exports = router;
