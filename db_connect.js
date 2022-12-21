const mongoose = require('mongoose')
require('dotenv').config()
const url = process.env.MONGO_URI;
console.log("hello")
const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to the database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. n${err}`);
    })