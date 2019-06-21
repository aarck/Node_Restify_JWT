const errors = require('restify-errors');
const User = require('../models/User');
const bcrypt = require('bcryptjs')
const auth = require('../Auth');
const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = server =>{
    //Register
    server.post('/register',(req,res,next)=>{
        const {email,password} = req.body;
        const user = new User({
            email,
            password
        });
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(user.password,salt,async(error,hash)=>{
                //Hash 
                user.password = hash;
                //Save user
                try {
                    const newUser = await user.save();
                    res.send(201);
                    next();
                } catch (error) {
                    return next(new errors.InternalError(error.message));
                }
            });
        });
    });
    //Auth User i.e Auth route to get token to match email password to database
    server.post('/auth',async(req,res,next)=>{
        //send email and password to authenticate
        const {email,password} = req.body;
        try{
            const user= await auth.authenticate(email,password);
            //Create token
            const token = jwt.sign(user.toJSON(),config.JWT_SECRET,{
                expiresIn: '15m'
            });
            //Retrive issues 
            const {iat,exp} = jwt.decode(token);
            //Respond with token
            res.send({iat,exp,token});
            next();
        }catch(err){
            //user unauthorized
            return next(new errors.UnauthorizedError(err));

        }
    })

}