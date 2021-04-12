// inject environment variables
require('dotenv').config();

// require dependencies
const express = require('express');

// require db connection helper
const {
    connectToMongo
} = require('./utils/dbUtils');

// require server routers
const apiRouter = require('./api');

// create new server
const server = express();

const PORT = process.env.PORT || 3000

// body parser for json requests
server.use(express.json());

// log incoming requests
server.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

server.use('/', apiRouter);

(async () => {
    try {
        // connect to mongodb
        await connectToMongo(process.env.MONGO_HOST, process.env.MONGO_PORT, process.env.MONGO_DATABASE);

        // lift server
        server.listen(PORT, () => {
            console.log(`server listen on port ${PORT}`);
        }).on('error', (err) => {
            console.log('could not lift server');
            console.log(err);
            process.exit(1);
        });
        // in case server could not connect to mongo
    } catch (err) {
        console.log('could not connect to db');
        console.log(err);
        process.exit(1);
    }
})();