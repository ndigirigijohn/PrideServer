const User = require ('../models/User')
const bcrypt = require('bcrypt')
module.exports = {
    getUsers : async (req, res)=>{
        res.send('Getting users')
    },
    register : async (req, res)=>{
        const {username, password, email, phone}= req.body;
        const duplicate = await User.findOne({'contact.email': email}).exec();

        if(duplicate){
            res.status(409).json({'message':'Email already exists'});
            return;
        }
        try {
            //create and store user
            console.log(req.body)
            const result =  await User.create({
                username: username,
                password: await bcrypt.hash(password,8),
                contact: {
                    email:email,
                    phone:phone
                    }

            });
            console.log("result",result);
            res.json(result);
        }
        catch(err){
            console.log(err)
            res.status(500).json({'message':err.message})
        }

    },
    login : async (req, res)=>{
        const {email, password}= req.body;
        const user = await User.findOne({'contact.email': email}).exec();
        if(!user){
            res.status(404).json({'message':'User not found'});
            return;
        }
        try {
            const result = await bcrypt.compare(password, user.password);
            if(result){
                res.json(user);
            }else{
                res.status(401).json({'message':'Invalid credentials'});
            }
        }
        catch(err){
            res.status(500).json({'message':err.message})
        }
    },
    setCode: async (req, res)=>{
        const {code} = req.body;
        const {id} = req.params;
        console.log(code, id)

        try{
            const result = await User.findByIdAndUpdate(id, {skincode:code});
            res.json(result);
        }
        catch(err){
            res.status(500).json({'message':err.message})
        }
    }
}