const {connectDB} = require('../config/config')
const Feedback = require ('../models/Feedback')

connectDB()
module.exports= {
    create:async(req, res)=>{
        const {name, email, product, message}=req.body
        try{
            const result= await Feedback.create({
                name:name,
                email:email,
                product:product,
                message:message,
               
            })
            res.json(result)

        }
        catch(err){ 
            console.log(err)
        }

    },
    readFeedback: async(req, res)=>{
        try{
           const result= await Feedback.find()
           res.json(result)
        }
        catch(err){
            console.log(err)
            res.status(500).json({
                err: err.message
            })
        }
    } ,
    readFiveFeedback: async(req, res)=>{
        try{
           const result= await Feedback.find().limit(5)
           res.json(result)
        }
        catch(err){
            console.log(err)
            res.status(500).json({
                err: err.message
            })
        }
    },
    readLastFiveFeedback: async(req, res)=>{
        console.log("last ")
        try{
           const result= await Feedback.find().sort({_id:-1}).limit(5)
           res.json(result)
        }
        catch(err){
            console.log(err)
            res.status(500).json({
                err: err.message
            })
        }
    }
    ,
}