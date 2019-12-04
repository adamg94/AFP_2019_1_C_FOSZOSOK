const mongoose = require('mongoose');

const Schema = require('mongoose').Schema;

const WallSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	level: {
		type: Number,
		required: true
	},
	description: {
		type: String,
		required: true
	}
});

const Wall = mongoose.model('Wall', WallSchema);
module.exports = Wall;
