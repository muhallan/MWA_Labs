const mongoose = require('mongoose');
require('./students-models');

mongoose.connect(process.env.DB_URL + "/" + process.env.DB_NAME);

mongoose.connection.on('connected', () => {
    console.log("Mongoose connected to", process.env.DB_NAME);
});

mongoose.connection.on('disconnected', () => {
    console.log("Mongoose disconnected");
});

mongoose.connection.on('error', (err) => {
    console.log("Mongoose error", err);
});
