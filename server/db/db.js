const mongoose = require("mongoose");
require('dotenv').config();
const Mongo_Url = process.env.MONGO_URL;
mongoose.connect(Mongo_Url)
    .then(() => (
        console.log("Mongo Connected...")
    ))
    .catch((err) => (
        console.error("Unable to connect...", err)
    ));