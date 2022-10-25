const {connectDB} = require('../config/config')
const Feedback = require ('../models/Feedback')

connectDB()
module.exports= {
    create:async(req, res)=>{
        const {name, email, content}=req.body
        try{
            const result= await Feedback.create({
                name:name,
                email:email,
                content:content
               
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
}