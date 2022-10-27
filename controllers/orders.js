const {connectDB} = require('../config/config')
const Order = require ('../models/Order')

connectDB()

module.exports= {
    makeOrder:async(req, res)=>{
        const {userId,name, email,phone, items, count, shipping, total}=req.body
        try{
            const result= await Order.create({
                userid:userId,
                name:name,
                email:email,
                phone:phone,
                items:items,
                count:count,
                shipping:shipping,
                total:total
            })
            res.json(result)

        }
        catch(err){ 
            res.status(500).json({error:err.message})
            console.log(err)
        }

    },
    
}