const mongoose = require("mongoose");

require("dotenv").config();

const mongoOptions = {};

const URI = process.env.mongoURI;

module.exports.ConnectToMongoDB = async () => {
  await mongoose.connect(URI, mongoOptions, (err) => {
    if (err) console.log(err);
  });
};
