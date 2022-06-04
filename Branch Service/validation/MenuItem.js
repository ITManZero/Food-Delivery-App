const Joi = require("joi");

const Name = Joi.string().max(15).required();
const Desc = Joi.string().max(50);
const Categories = Joi.array().items(Joi.string().max(24));
const Ingredients = Joi.array().items(
  Joi.object({
    Name: Joi.string().max(10).required(),
    DefaultPieces: Joi.number().required(),
    MaxPieces: Joi.number().required(),
    Desc: Joi.string().max(50),
    Image: Joi.string(),
  })
);
const Price = Joi.number();
const Offer = Joi.boolean();
const Hidden = Joi.boolean();
const Branches = Joi.array();

const CreateMenuItemSchema = Joi.object({
  Name: Name.required(),
  Desc,
  Categories,
  Ingredients: Ingredients.required(),
  Price: Price.required(),
  Offer: Offer.required(),
  Hidden,
  Branches,
});

const UpdateMenuItemSchema = Joi.object({
  Name,
  Desc,
  Categories,
  Ingredients,
  Price,
  Offer,
  Hidden,
  Branches,
});

module.exports = { CreateMenuItemSchema, UpdateMenuItemSchema };
