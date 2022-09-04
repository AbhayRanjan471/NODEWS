//step1: require the library
const mongoose = require('mongoose');

//step2: connect to the database
mongoose.connect('mongodb://localhost/codeial_development');

//step3: acquire the connection ( to check if it is successfull)
const db = mongoose.connection;

// step4: if there is an error than print error
db.on('error', console.error.bind(console, 'error connnecting to db'));

// step5: if its up and running than print the message
db.once('open', function(){
    console.log('Successfully connected to the database');
})

// to make this file usable we need to export this
// module.exports = db;