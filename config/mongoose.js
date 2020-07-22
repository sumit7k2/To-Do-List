// we have to require the package
const mongoose=require('mongoose');
// connecting to db
mongoose.connect('mongodb://localhost/to_do_list_db');
// checking the connection
const db=mongoose.connection;

// error
db.on('error',console.error.bind(console,'error connecting to db'));

// db running
db.once('open',function(){
    console.log('Succesfully connected to the database');
});