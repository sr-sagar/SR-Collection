const express = require("express");
const cors = require("cors");
require('dotenv').config();
require('./db/db');
// const adminRouter = require("./routes/adminRouter")
const userRouter = require("./routes/userRouter")
const userOrderRouter = require("./routes/userOrderRouter")
const userCartRouter = require("./routes/userCartRouter")
const productRouter = require('./routes/productUploadRouter');
const supervisiorRouter = require('./routes/supervisiorRouter');
const generalRateLimiting = require('./middleware/rateLimiting');
const PORT = process.env.PORT || 8080;
const path = require('path');

const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
}));
app.use(express.urlencoded({extended: true}));
app.use(generalRateLimiting)
app.use('/', userRouter)
app.use('/', userOrderRouter)
app.use('/', userCartRouter)
app.use('/supervisior', supervisiorRouter)
app.use('/productUpload', productRouter)
app.use('/images', express.static(path.join(__dirname,'images')))






app.listen(PORT, () => {
    console.log("Server is running on port ", PORT);
})

