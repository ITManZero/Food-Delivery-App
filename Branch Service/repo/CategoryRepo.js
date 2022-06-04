const { Category } = require("../model");

const {
  DuplicateKeyError,
  NotFoundError,
  BadRequestError,
} = require("../handler/AppError");

const FindCategoryByID = async (CategoryID) => {
  const category = await Category.findById(CategoryID);
  if (!category) throw new NotFoundError("category not found");
  return category;
};

const FindCategoryByName = async (CategoryName) => {
  const category = await Category.findOne({ Name: CategoryName });
  if (!category) throw new NotFoundError("category not found");
  return category;
};

const CategoriesIds = async (CategoriesNames) => {
  if (!CategoriesNames) return [];
  const categoriesIds = await Category.aggregate([
    { $match: { $expr: { $in: ["$Name", CategoriesNames] } } },
    { $project: { __id: 1, Name: 1 } },
  ]);
  return categoriesIds.map((obj) => obj._id);
};

const FindAllCategories = async () => {
  return await Category.find();
};

const AddNewCategory = async (CategoryDetails) => {
  try {
    const NewCat = new Category(CategoryDetails);
    await NewCat.save();
  } catch (err) {
    if (err.name === "MongoServerError" && err.code === 11000)
      throw new DuplicateKeyError("category name already exists");
  }
};

const UpdateOneCategory = async (CategoryID, CategoryDetails) => {
  const { matchedCount, modifiedCount } = await Category.updateOne(
    CategoryID,
    CategoryDetails
  );
  if (matchedCount < 1) throw new NotFoundError("not found category");
  if (modifiedCount < 1) throw new BadRequestError("category did not update");
};

module.exports = {
  FindCategoryByID,
  FindCategoryByName,
  FindAllCategories,
  CategoriesIds,
  AddNewCategory,
  UpdateOneCategory,
};
