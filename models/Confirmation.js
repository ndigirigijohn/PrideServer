const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const Confirmation = new Schema({
    MerchantRequestID : {   
        type:String,
        required: true
    },
    CheckoutRequestID : {
        type:String,
        required: true
    },
    ResultCode : {
        type:Number,
        required: true
    },
    ResultDesc : {
        type:String,
        required: true
    },
    Amount : {
        type:Number,
        required:true
    },
    PhoneNumber : {
        type:String,
        required:true
    },
    billRefNumber : { 
        type:String,
        required:true
    }

    
});
module.exports=mongoose.model('Confirmation', Confirmation);