const { Schema, model } = require("mongoose");

const IngredientsSchema = new Schema({
  Name: { type: String, required: true },
  DefaultPieces: { type: Number, required: true },
  MaxPieces: { type: Number, required: true },
  Desc: String,
  Image: { type: String, default: "" },
});

const MenuItemSchema = new Schema({
  Name: { type: String, required: true, unique: true },
  Desc: String,
  Categories: [{ type: Schema.Types.ObjectId, ref: "Categories" }],
  Ingredients: [IngredientsSchema],
  FavScore: { type: Number, default: 0 },
  OrderScore: { type: Number, default: 0 },
  Price: { type: Number, required: true },
  Offer: { type: Boolean, required: true },
  Hidden: { type: Boolean, default: false },
  Branches: [
    {
      BranchID: { type: Schema.Types.ObjectId, ref: "Branches" },
    },
  ],
});

module.exports.MenuItem = model("MenuItems", MenuItemSchema);
