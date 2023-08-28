//jshint esversion:6
// for passport npm i passport passport-local passport-local-mongoose express-session
import {} from 'dotenv/config'
import md5 from 'md5';
import ejs from "ejs";
import express from "express";
import bodyParser from "body-parser";
import mongoose,{connect} from "mongoose";
// // Exactly in the order
// import session from 'express-session';
// import passport from 'passport';
// import passportLocalMongoose from 'passport-local-mongoose';


import encrypt from "mongoose-encryption";
import bcrypt, { hash } from "bcrypt";
const saltRounds = 10;
;
const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

main().catch(err => console.log(err));

async function main() {

  await mongoose.connect('mongodb://127.0.0.1/userDB');

}

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});


const User = new mongoose.model("User", userSchema);

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/register", async (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
    const newUser = new User({
      email: req.body.username,
      password: hash,
   
    });

   
   await newUser.save().then(()=>{res.render("secrets")});
  });
});

app.post("/login",async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

 const found= await User.findOne({ email: username });
      if (found!=null) {
       bcrypt.compare(password, found.password, (err, result) => {
          result ? res.render("secrets") : res.send("password is wrong");
        });
      }
    }
  );


app.post("/logout", (req, res) => {});

app.post("/submit", (req, res) => {});

const port = 3000;
app.listen(port, () => {
  console.log("Server started on port 3000");
});