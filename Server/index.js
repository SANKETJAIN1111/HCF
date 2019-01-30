const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const app = express();
const mongoose  = require('mongoose');

// store config variables in dotenv
require('dotenv').config();
schema = require('./schema/mongoDBSchema'); // uncomment this for MONGODB
// ****** Set up default mongoose connection START ****** //
var mongoDB = process.env.mongoDBMLABURL; // cloud hosted MongoDB
//var mongoDB = process.env.mongoDBLocalURL; // locally hosted MongoDB
mongoose.connect(mongoDB);

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connection.once('open', () => {
     console.log('conneted to MONGODB- EMS database');
});
// ****** Set up default mongoose connection END ****** //

// ****** allow cross-origin requests code START ****** //
app.use(cors()); // uncomment this to enable all CORS and delete cors(corsOptions) in below code
var allowedOrigins = process.env.allowedOrigins.split(',');
/*
app.use(cors({
    origin: function (origin, callback) {
        //allow requests with no origin 
        // (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not ' + 'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }

}));
*/
// ****** allow cross-origin requests code END ****** //

// bind express with graphql
app.use('/graphql', graphqlHTTP({
    schema : schema,
    graphiql: true
}));
app.use('/', (req, res) => res.send("Welcome EMS User"));
app.listen(process.env.GRAPHQLPORT||3000, () => console.log('GRAPHQL+EMS Enterprise Server is ready on localhost:' + process.env.GRAPHQLPORT));