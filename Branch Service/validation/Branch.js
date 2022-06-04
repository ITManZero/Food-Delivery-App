const Joi = require("joi");

const BranchItemSchema = Joi.object({
  Published: Joi.boolean().required(),
});

const BranchSchema = Joi.object({
  Name: Joi.string().max(15).required(),
  Online: Joi.boolean(),
  Hidden: Joi.boolean(),
});

module.exports = { BranchItemSchema, BranchSchema };
