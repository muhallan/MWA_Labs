const express = require('express');
require('dotenv').config();
const routes = require('./routes');

const app = express();

app.use(express.json());

app.use("/api", routes);

const server = app.listen(process.env.PORT, () => {console.log("Listening on port", server.address().port)});
