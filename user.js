const mongoose = require('mongoose')


const userSchema = new mongoose.Schema(
    {
        phone : { type : String , required : true , unique : true},
        password : { type : String , required : true},
        name : { type : String , required : true},
        activity: {
            type: [{
              activityToken:String,
              startDay :String, 
              owner:String
            }],
            default: undefined
        }
    },
    {collection : 'user'}
)

const model = mongoose.model('userSchema',userSchema)

module.exports = model