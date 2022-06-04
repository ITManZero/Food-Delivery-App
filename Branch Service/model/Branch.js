const { Schema, model } = require("mongoose");

const BranchScheam = new Schema({
  Name: { type: String, required: true, unique: true },
  Items: [
    {
      MenuItemId: {
        type: Schema.Types.ObjectId,
        ref: "MenuItems",
        required: true,
      },
      Published: { type: Boolean, default: true },
    },
  ],
  Online: { type: Boolean, default: true },
  Hidden: { type: Boolean, default: false },
});

module.exports.Branch = model("Branches", BranchScheam);
