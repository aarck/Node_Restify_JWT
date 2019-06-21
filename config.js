//Object with some variables

module.exports = {
    ENV : process.env.NODE_ENV || 'development',
    PORT : process.env.PORT || 3000,
    URL : process.env.BASE_URL || 'http://localhost:3000',
    MONGODB_URI: process.env.MONGODB_URI || 
    'mongodb://abc123:abc123@ds259361.mlab.com:59361/restify',
    //we will use mLab which is DataBase as a service
    JWT_SECRET:process.env.JWT_SECRET || 'random'
}