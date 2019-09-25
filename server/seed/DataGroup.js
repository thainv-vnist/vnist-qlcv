const Group = require('../models/Group');
const mongoose = require("mongoose");

// DB Config
const db = require("../config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));


//3. Seed data role -----------------------------//
var groups = [
    {
        name: 'PhongA'
    },
    {
        name: 'PhongB'
    },
    {
        name: 'PhongC'
    }
];

Group.insertMany(groups, function(err, result){
    if(!err){
        console.log("Seed GroupData :\n" + result);
    }else{
        console.log(err);
    }
});