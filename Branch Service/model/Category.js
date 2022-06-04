const { Schema, model } = require("mongoose");

const CategorySchema = new Schema({
  Name: { type: String, required: true, unique: true },
  icon: { type: String, default: "" },
});

module.exports.Category = model("Categories", CategorySchema);
