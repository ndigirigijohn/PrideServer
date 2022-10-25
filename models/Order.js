const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const Order = new Schema({
    userid : {
        type:String,
        required: true
    },
    items : {
        type:Array,
        required:true
    },
    count : {
        type:Number,
        required:true
    },
    shipping : {
        type:Number,
        required:true
    },
    total : {
        type:Number,
        required:true
    },
    pending : {
        type:Boolean,
        default:true
    }


    
});
module.exports=mongoose.model('Order', Order);