const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const option = {
    socketTimeoutMS: 30000,
    keepAlive: true,
    reconnectTries: 30000,
    useNewUrlParser: true,
};
mongoose.connect(`mongodb://${process.env.DATABASEURL}:${process.env.DATABSEPORT}/${process.env.DATABASE}`, option).then((resopnse) => {
    console.log(`${process.env.DATABASE} Database server connected....`);
    mongoose.set('debug', true);
}).catch((error) => {
    console.log(error);
    console.log('Could not connect Database server....');
});