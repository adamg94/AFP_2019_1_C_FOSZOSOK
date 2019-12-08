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
    lastupdate : {
        type : Date,
        default : ''
    },
    buildings : {
       palace : {
           level : {
               type : Number,
               default : 1
           },
           maxlevel : {
                type : Number,
                default : 50
           },
           id : {
                type : Number,
                default : 1
           }
       },
       merch : {
            level : {
                type : Number,
                default : 1
            },
            maxlevel : {
                type : Number,
                default : 30
            },
            id : {
                type : Number,
                default : 2
            }
       },
       merchworkshop : {
            level : {
                type : Number,
                default : 1
            },
            maxlevel : {
                type : Number,
                default : 10
            },
            id : {
                type : Number,
                default : 3
            }
       },
       temple : {
            level : {
                type : Number,
                default : 1
            },
            maxlevel : {
                type : Number,
                default : 10
            },
            id : {
                type : Number,
                default : 4
            },
            moral : {
                type : Number,
                default : 50
            }
       },
       wall : {
        level : {
            type : Number,
            default : 1
        },
        maxlevel : {
            type : Number,
            default : 30
        },
        id : {
            type : Number,
            default : 5
        }
       },
       warehouse : {
            level : {
                type : Number,
                default : 1
            },
            maxlevel : {
                type : Number,
                default : 50
            },
            id : {
                type : Number,
                default : 6
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
            },
            stone : {
                type : Number,
                default: 0
            },
            metal : {
                type : Number,
                default: 0
            },
            wheat : {
                type : Number,
                default: 0
            },
            copper_chance : {
                type : Number,
                default: 0
            },
            silver_chance : {
                type : Number,
                default: 0
            },
            gold_chance : {
                type : Number,
                default: 0
            },
            last_check : {
                type : Date,
                default: ''
            }
       },
       hideout : {      
            level : {
                type : Number,
                default : 1
            },
            maxlevel : {
                type : Number,
                default : 50
            },
            id : {
                type : Number,
                default : 7
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
            },
            stone : {
                type : Number,
                default: 0
            },
            metal : {
                type : Number,
                default: 0
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
        level : {
            type : Number,
            default : 0
        },
        maxlevel : {
            type : Number,
            default : 1
        },
        id : {
            type : Number,
            default : 8
        }
       },
       metalfurnace : {
        level : {
            type : Number,
            default : 1
        },
        maxlevel : {
            type : Number,
            default : 10
        },
        id : {
            type : Number,
            default : 9
        }
       },
       mill : {
        level : {
            type : Number,
            default : 1
        },
        maxlevel : {
            type : Number,
            default : 10
        },
        id : {
            type : Number,
            default : 10
        }
       },
       wheatfield : {
        level : {
            type : Number,
            default : 1
        },
        maxlevel : {
            type : Number,
            default : 50
        },
        id : {
            type : Number,
            default : 11
        }
       },
       ironmine : {
        level : {
            type : Number,
            default : 1
        },
        maxlevel : {
            type : Number,
            default : 50
        },
        id : {
            type : Number,
            default : 12
        }
       },
       brickyard : {
        level : {
            type : Number,
            default : 1
        },
        maxlevel : {
            type : Number,
            default : 50
        },
        id : {
            type : Number,
            default : 13
        }
       },
       lumberyard : {
        level : {
            type : Number,
            default : 1
        },
        maxlevel : {
            type : Number,
            default : 50
        },
        id : {
            type : Number,
            default : 14
        }
       }
    }
})


const Village = mongoose.model('Village', VillageSchema)
module.exports = Village