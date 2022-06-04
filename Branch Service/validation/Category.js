const Joi = require("joi");

const Name = Joi.string().max(15);
const img = Joi.string();

const CreateCategorySchema = Joi.object({ Name: Name.required(), img });
const UpdateCategorySchema = Joi.object({ Name, img });

module.exports = {
  CreateCategorySchema,
  UpdateCategorySchema,
};
