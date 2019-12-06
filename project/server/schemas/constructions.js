
const mongoose = require('mongoose')

const Schema = require('mongoose').Schema

const ConstructionSchema = new Schema({
        buildingId : {
            type : Number,
            default : 0
        },
        action : {
            type : Number,
            default : 0
        },
        startTime : {
            type : Date,
            default : ''
        },
        jobTime : {
            type : Number,
            default : 0
        }
})


const Construction = mongoose.model('Construction', ConstructionSchema)
module.exports = Construction