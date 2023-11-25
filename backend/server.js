const express = require("express");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const ForumRoutes = require("./routes/forumroutes");
const mongoose = require('mongoose')

// database connection
const MONGO_URI='mongodb+srv://shiekhfarhanyousaf1813:farhan1234@cluster0.einbzzv.mongodb.net/Student_Forum'
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('connected to database')    
  })
  .catch((err) => {
    console.log(err)
  }) 
// middlewares
app.use(express.json());
app.use(cors());
// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/forums", ForumRoutes);
const port =  1000;
app.listen(port, console.log(`Listening on port ${port}...`));
