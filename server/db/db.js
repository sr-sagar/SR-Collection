const mongoose = require("mongoose");
const Mongo_Url = process.env.Mongo_Url;
mongoose.connect(Mongo_Url)
    .then(() => (
        console.log("Mongo Connected...")
    ))
    .catch((err) => (
        console.error("Unable to connect...", err)
    ));