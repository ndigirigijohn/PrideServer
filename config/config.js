const mongoose = require('mongoose')
const url = `mongodb+srv://pride:${process.env.MONGOPWD}@cluster0.gzf3lkz.mongodb.net/prideDB?retryWrites=true&w=majority`;

const connectionParams={
    useNewUrlParser: true,
}
const connectDB= async ()=>{
    mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to the database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. n${err}`);
    })
}
module.exports={connectDB}