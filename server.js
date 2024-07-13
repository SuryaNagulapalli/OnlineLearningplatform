const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const nodemon = require("nodemon");
const bodyparser = require("body-parser");

const app=express()
dotenv.config()

const PORT = process.env.PORT || 8080;
const MONGOURI = process.env.MONGO_URI;

mongoose.connect(MONGOURI)
.then(()=>{
    console.log("Database connected sucessfully")
})
.catch((error)=>{
    console.log("Error",error)
});

//Schema creation
const DemoSchema = new mongoose.Schema({
    Firstname:{
      type:String,
      required:true,
    },
    Lastname:{
      type:String,
      required:true,
    },
    Email:{
      type:String,
      required:true,
      unique:true,
    },
    Password:{
      type:String,
      required:true,
    }
  });

const collection = new mongoose.model("studentdetailes", DemoSchema);

// Middleware to parse request body
app.use(bodyparser.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/index.html");
});

app.get("/login",(req,res)=>{
    res.sendFile(__dirname + "/login.html");
});
app.get("/signup",(req,res)=>{
    res.sendFile(__dirname + "/signup.html");
});

app.get("/main",(req,res)=>{
  res.sendFile(__dirname + "/main.html");
});
app.get("/python",(req,res)=>{
    res.sendFile(__dirname + "/python.html");
});
app.get("/react",(req,res)=>{
    res.sendFile(__dirname + "/react.html");
});
app.get("/javascript",(req,res)=>{
    res.sendFile(__dirname + "/javascript.html");
});
app.get("/sql",(req,res)=>{
    res.sendFile(__dirname + "/sql.html");
});
app.get("/django",(req,res)=>{
    res.sendFile(__dirname + "/django.html");
});
app.get("/html",(req,res)=>{
    res.sendFile(__dirname + "/html.html");
});
app.get("/css",(req,res)=>{
    res.sendFile(__dirname + "/css.html");
});

app.post("/",(req,res)=>{
    const Newdata = new collection({
        Firstname:req.body.Firstname,
        Lastname:req.body.Lastname,
        Email:req.body.Email,
        Password:req.body.Password,
    });
    Newdata.save();
    res.redirect("/login");
});

app.post("/login", async (req, res) => {
  const { Email, Password } = req.body;

  try {
    const user = await collection.findOne({ Email: Email });

    if (!user) {
      return res.status(400).send("User not found.");
    }

    if (user.Password !== Password) {
      return res.status(400).send("Invalid password.");
    }

    // res.send("Login successful! Redirecting to main page...");

    // Redirect to the main page
    res.redirect("/main");
    
  } catch (err) {
    return res.status(500).send("Error occurred during login.");
  }
});

app.listen(PORT,()=>{
    console.log(`server connected sucessfully ${PORT}`)
});