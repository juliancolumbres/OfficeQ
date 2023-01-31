const express = require("express");
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3001;
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

// set up express
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// setup db connection
const db = {};
db.mongoose = mongoose;
mongoose.set('strictQuery', false)
db.mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// add routes from routes folder
const userRoutes = require('./routes/user');
app.use('/', userRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});