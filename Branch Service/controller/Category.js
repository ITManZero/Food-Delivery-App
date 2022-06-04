const {
  FindCategoryByID,
  FindCategoryByName,
  FindAllCategories,
  AddNewCategory,
  UpdateOneCategory,
} = require("../repo");

const { catchAsync, validator } = require("../util");

const { CreateCategorySchema, UpdateCategorySchema } = require("../validation");

const GetCategory = catchAsync(async (req, res, next) => {
  const category = await FindCategoryByID(req.params.cid);
  res.status(200).json(category);
});

const GetCategories = catchAsync(async (req, res, next) => {
  const categories = await FindAllCategories();
  res.status(200).json(categories);
});

const CreateCategory = catchAsync(async (req, res, next) => {
  await validator(CreateCategorySchema, req.body);
  await AddNewCategory(req.body);
  res.status(201).json({ message: "one category created" });
});

const UpdateCategory = catchAsync(async (req, res, next) => {
  await validator(UpdateCategorySchema, req.body);
  await UpdateOneCategory(req.params.cid, req.body);
  res.status(200).json({ message: "one category updated" });
});

module.exports = { GetCategory, GetCategories, CreateCategory, UpdateCategory };
