require('dotenv').config();
const express = require('express');
require("./api/data/db");
const routes = require('./api/routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api", routes);

const server = app.listen(process.env.PORT, () => {console.log(process.env.LISTEN_TO_PORT_MSG, server.address().port);});
