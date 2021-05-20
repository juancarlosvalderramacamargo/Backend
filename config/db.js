const mongoose = require('mongoose');
const dbURL = require('./properties').DB;

module.exports = ()=>{
    mongoose.connect(dbURL, {useNewUrlParser: true})
    .then(()=>console.log(`mongo connected on ${dbURL}`))
    .catch(err => console.log(`mongo connection error ${err}`))

    process.on('SIGINT',()=>{
        mongoose.connection.close(()=>{
            console.log(`mongo disconnected`);
            process.exit(0);
        });
    })
}