const {connectDB} = require('../config/config')
const Code = require ('../models/Code')

connectDB()

module.exports= {
    addCode:async(req, res)=>{
        const {skincode, products}=req.body
        try{
            const result= await Code.create({
                skincode:skincode,
                products:products
            })
            res.json(result)

        }
        catch(err){ 
            console.log(err)
        }

    },
    readCodes: async(req, res)=>{
        try{
           const result= await Code.find()
           res.json(result)
        }
        catch(err){
            console.log(err)
            res.status(500).json({
                err: err.message
            })
        }
    } ,
    getCodesByIdentifier: async(req, res)=>{
        const {code}=req.params
        try{
            const result= await Code.findOne({skincode:code})
            res.json(result)
        }
        catch(err){
            console.log(err)
            res.status(500).json({
                err: err.message
            })
        }
    }
}