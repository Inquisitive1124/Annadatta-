//app
const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT 
app.use(express.json());

//dbConnect
const dbConnect = require("./config/database.js");
dbConnect();

//routes Mount
const authRoutes = require("./routes/userRoutes.js");
app.use("/api/v1",authRoutes);
//cloudConnect


//app listens
app.listen(PORT,()=>{
    console.log(`Application running on the post : ${PORT}`);
})



