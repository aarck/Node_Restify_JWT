const errors= require('restify-errors');
const Customer = require('../models/Customer');
const rjwt = require('restify-jwt-community');
const config= require('../config');

module.exports = server => {
//Handle the routes
//Get Customers
server.get('/customers',async(req,res,next)=>{
    //we can use promises or pass parameter or we can use await method
    //in order to use await it should be inside a function
    try{
        const customers= await Customer.find({});
        res.send(customers);
        next();
     }catch(err){
         //There are lot of Restify-errors are available , here we are using the following
         return next(new errors.InvalidContentError(err));
     }
    
    //as we are not using promises .then so for error handling we need to use try catch
    //res.send({msg:'test'});
});
//Get single customer
server.get('/customer/:id',async(req,res,next)=>{
    try {
        const customer = await Customer.findById(req.params.id);
        res.send(customer)
        next();
    } catch (error) {
        return next(new errors.ResourceNotFoundError(`There is no customer of id ${req.params.id}`));
        
    }
})

//Add customers
    server.post('/customers',rjwt({secret:config.JWT_SECRET}),async(req,res,next)=>{
        //Make sure content-type is application.json
        if(!req.is('application/json')){
            return next(new errors.InvalidContentError("Expects 'application/json'"));

        }
        const {name,email,balance}=req.body;
        const customer = new Customer({
            name,
            email,
            balance
        });

        //Save to db
        try{
            const newCustomer = await customer.save();
            res.send(201);
            next();
        }catch(err){
            return next(new errors.InternalError(err.message));
        }

    });
 //Update customer
 server.put('/customers/:id',rjwt({secret:config.JWT_SECRET}),async(req,res,next)=>{
    //Make sure content-type is application.json
    if(!req.is('application/json')){
        return next(new errors.InvalidContentError("Expects 'application/json'"));

    }
    //Save to db
    try{
        const Customer = await Customer.findOneAndUpdate({_id:req.params.id},req.body);
        res.send(200);
        next();
    }catch(err){
        return next(new errors.ResourceNotFoundError(`There is no customer of id ${req.params.id}`));    }

});
//Delete Customer
server.del('/customers/:id',rjwt({secret:config.JWT_SECRET}),async(req,res,next)=>{
    try {
        const customer = await Customer.findOneAndRemove({_id:req.params.id});
        res.send(204);
        next()
    } catch (error) {
        return next(new errors.ResourceNotFoundError(`There is no customer of id ${req.params.id}`));    }
        
    });
};

