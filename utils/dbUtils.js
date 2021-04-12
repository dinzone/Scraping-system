const mongoose = require('mongoose');

module.exports.connectToMongo = (host = 'localhost', port = 27017, database = 'test') => {
    return mongoose.connect(`mongodb://${host}:${port}/${database}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}