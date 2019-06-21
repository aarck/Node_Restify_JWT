const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const User = mongoose.model('User');

exports.authenticate = (email,password) =>{
    return new Promise(async(resolve,reject)=>{
        try {
            //Get user by email
            const user = await User.findOne({email});
            //if found keep going
            bcrypt.compare(password,user.password,(err,isMatch)=> {
                if(err) throw err;
                if(isMatch) {
                    resolve(user);
                }
                else{ 
                    //pass didnt match
                    reject('Authentication failed');
                }
            });
        }catch(err){
            //email not found
            reject('Authentication failed')
        }

    })
}