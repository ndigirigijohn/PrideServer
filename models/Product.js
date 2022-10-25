const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    identifier: {
        type:String,
        required:true
    },

    name: {
        type:String,
        required:true
    },
    price : {
        type:Number,
        required:true
    },
    image: {
        type:String,
        required:true
    },

    description: {
        type:String,
        required:true
    },
    category: {
        type: String,
        required:true
    },
    ratings:{
        total:{
           type: Number,
            default:0
        },
        count:{
            type: Number,
            default:0

        },
        average:{
            type: Number,
            default:0

        }
    }

});

module.exports=mongoose.model('Product', productSchema);