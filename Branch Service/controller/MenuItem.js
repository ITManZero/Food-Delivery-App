const {
  FindItemByID,
  FindAllItems,
  AddNewItem,
  DeleteOneItem,
  DeleteOneBranchItem,
  UpdateOneItem,
  FindBranchesStatus,
  AddBranchItem,
  CheckBranch,
  CategoriesIds,
} = require("../repo");

const { catchAsync, validator } = require("../util");

const { CreateMenuItemSchema, UpdateMenuItemSchema } = require("../validation");

const GetItems = catchAsync(async (req, res, next) => {
  const items = await FindAllItems();
  res.status(200).json(items);
});

const GetItem = catchAsync(async (req, res, next) => {
  const item = await FindItemByID(req.params.iid);
  res.status(200).json(item);
});

const GetBranchesStatus = catchAsync(async (req, res, next) => {
  const branches = await FindBranchesStatus(req.params.iid);
  res.status(200).json(branches);
});

const CreateItem = catchAsync(async (req, res, next) => {
  await validator(CreateMenuItemSchema, req.body);
  req.body.Categories = await CategoriesIds(req.body.Categories);
  const itemID = await AddNewItem(req.body);
  for ({ BranchID, Published } of req.body.Branches) {
    await CheckBranch(BranchID, itemID);
    await AddBranchItem({ BranchID, Published }, itemID);
  }
  res.status(201).json({ message: "one item added" });
});

const DeleteItem = catchAsync(async (req, res, next) => {
  const inBranches = await DeleteOneItem(req.params.iid);
  for ({ BranchID } of inBranches) {
    await CheckBranch(BranchID, req.params.iid, false);
    await DeleteOneBranchItem(BranchID, req.params.iid);
  }
  res.status(200).json({ message: "one item deleted" });
});

const UpdateItem = catchAsync(async (req, res, next) => {
  await validator(UpdateMenuItemSchema, req.body);
  req.body.Categories = await CategoriesIds(req.body.Categories);
  await UpdateOneItem(req.params.iid, req.body);
  res.json({ message: "one item updated" });
});

module.exports = {
  CreateItem,
  DeleteItem,
  UpdateItem,
  GetItem,
  GetItems,
  GetBranchesStatus,
};
