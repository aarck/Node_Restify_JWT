const restify = require('restify');
const mongoose = require('mongoose');
const config = require('./config');
const rjwt = require('restify-jwt-community');


const server = restify.createServer();

//Midleware
server.use(restify.plugins.bodyParser());
//Protect Routes
//server.use(rjwt({secret:config.JWT_SECRET}).unless({path:['/auth']}));
//Server Object

server.listen(config.PORT,()=>{
    mongoose.set('useFindAndModify',false);
    mongoose.connect(config.MONGODB_URI,{useNewUrlParser:true});
});

//Initialize database

const db = mongoose.connection;

//Check for errors
db.on('error',(err)=> console.log(err));
//open the Database

db.once('open',()=>{
    require('./routes/customers')(server);
    require('./routes/Users')(server);
    console.log(`Server started on port ${config.PORT}`);
});