const mongoose = require('mongoose')

const Schema = require('mongoose').Schema

const VillageSchema = new Schema({
    name : {
        type : String,
        required : true,
        default: 'My Village'
    },
    userId : {
        type : String,
        default: ''
    },
    buildings : {
       palace : {
           type : Number,
           id : 1,
           default : 1,
           max : 50
       },
       merch : {
           type : Number,
           id : 2,
           default : 1,
           max : 30
       },
       merchworkshop : {
           type : Number,
           id : 3,
           default : 0,
           max : 10
       },
       temple : {
           type : Number,
           id : 4,
           default : 1,
           max : 10,
           moral : 50
       },
       wall : {
        type : Number,
        id : 5,
        default : 0,
        max : 30
       },
       warehouse : {
        sources : {
            id : {
                type : Number,
                default : 6
            },
            level : {
                type : Number,
                default : 1,
                max : 50
            },
            wood : {
                type : Number,
                default: 500
            },
            iron : {
                type : Number,
                default: 500
            },
            brick : {
                type : Number,
                default: 500
            },
            silver : {
                type : Number,
                default: 0
            },
            gold : {
                type : Number,
                default: 0
            },
            copper : {
                type : Number,
                default: 0
            }
        }
       },
       hideout : {
        sources : {
            id : {
                type: Number,
                default : 7
            },
            level : {
                type : Number,
                default : 0,
                max : 50
            },
            state : {
                type : Boolean,
                default : false
            },
            wood : {
                type : Number,
                default: 0
            },
            iron : {
                type : Number,
                default: 0
            },
            brick : {
                type : Number,
                default: 0
            },
            silver : {
                type : Number,
                default: 0
            },
            gold : {
                type : Number,
                default: 0
            },
            copper : {
                type : Number,
                default: 0
            }
        },
        treasure : {
            silver : {
                type : Number,
                default: 0
            },
            gold : {
                type : Number,
                default: 0
            },
            copper : {
                type : Number,
                default: 0
            }
        }
       },
       statue : {
        type : Number,
        id : 8,
        default : 0,
        max : 1
       },
       metalfurnace : {
        type : Number,
        id : 9,
        default : 0,
        max : 10
       },
       mill : {
        type : Number,
        id : 10,
        default : 1,
        max : 10
       },
       wheatfield : {
        type : Number,
        id : 11,
        default : 1,
        max : 50
       },
       ironmine : {
        type : Number,
        id : 12,
        default : 0,
        max : 50
       },
       brickyard : {
        type : Number,
        id : 13,
        default : 0,
        max : 50
       },
       lumberyard : {
        type : Number,
        id : 14,
        default : 0,
        max : 50
       }
    },
    constructions : {
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
            default : 0
        },
        jobTime : {
            type : Number,
            default : 0
        }
    }
})


const Village = mongoose.model('Village', VillageSchema)
module.exports = Village