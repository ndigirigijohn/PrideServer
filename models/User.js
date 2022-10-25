const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username : {
        type:String,
        required: true
    },
    role : {
        type:String,
        default:'customer'
    },
    skincode : {
        type:String,
        default:''
    },
    contact : {
        phone : {
            type:String,
            required: true
            },
        email: {
            type:String,
            required: true
            }
    },
    password: {
        type:String,
        required: true
        },
    refeshtoken: String

    
});
module.exports=mongoose.model('User', userSchema);