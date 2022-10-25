const {connectDB} = require('../config/config')
const Order = require ('../models/Order')

connectDB()

module.exports= {
    makeOrder:async(req, res)=>{
        const {userid, items, count, shipping, total}=req.body
        try{
            const result= await Order.create({
                userid:userid,
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