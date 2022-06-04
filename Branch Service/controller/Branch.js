const {
  FindBranchByID,
  FindAllBranches,
  AddNewBranch,
  PushBranch,
  PullBranch,
  AddBranchItem,
  CheckBranch,
  CheckItem,
  UpdateOneBranch,
  ChangeItemStatus,
  DeleteOneBranchItem,
  FindBranchItemByID,
  FindAllBranchItems,
} = require("../repo");

const { catchAsync, validator } = require("../util");

const { BranchItemSchema, BranchSchema } = require("../validation");

/* Branch */

const GetBranches = catchAsync(async (req, res, next) => {
  const branches = await FindAllBranches(req.query);
  res.status(200).json(branches);
});

const GetBranch = catchAsync(async (req, res, next) => {
  const branch = await FindBranchByID(req.params.bid);
  res.status(200).json({ ...branch._doc });
});

const CreateBranch = catchAsync(async (req, res, next) => {
  await validator(BranchSchema, req.body);
  await AddNewBranch(req.body);
  res.status(201).json({ message: "one branch created" });
});

const UpdateBranch = catchAsync(async (req, res, next) => {
  await validator(BranchSchema, req.body);
  await UpdateOneBranch(req.params.bid, req.body);
  res.status(200).json({ message: "branch updated" });
});

/* Branch Item */

const GetBranchItems = catchAsync(async (req, res, next) => {
  const items = await FindAllBranchItems(req.params.bid);
  res.status(200).json(items);
});

const GetBranchItem = catchAsync(async (req, res, next) => {
  const item = await FindBranchItemByID(req.params.bid, req.params.biid);
  res.status(200).json(item);
});

const AddOneBranchItem = catchAsync(async (req, res, next) => {
  await validator(BranchItemSchema, req.body);
  await CheckBranch(req.params.bid, req.params.iid);
  await CheckItem(req.params.bid, req.params.iid);
  await PushBranch(req.params.bid, req.params.iid);
  await AddBranchItem(
    {
      BranchID: req.params.bid,
      Published: req.body.published,
    },
    req.params.iid
  );
  res.status(200).json({ message: "branch item added successfully" });
});

const UpdateItemStatus = catchAsync(async (req, res, next) => {
  await validator(BranchItemSchema, req.body);
  await CheckBranch(req.params.bid, req.params.iid, false);
  // await FindBranchItemByID(req.params.bid, req.params.iid);
  await ChangeItemStatus(req.params.bid, req.params.iid, req.body.Published);
  res.status(200).json({ message: "branch item updated successfully" });
});

const DeleteBranchItem = catchAsync(async (req, res, next) => {
  await CheckBranch(req.params.bid, req.params.iid, false);
  // await FindBranchItemByID(req.params.bid, req.params.iid);
  await DeleteOneBranchItem(req.params.bid, req.params.iid);
  await PullBranch(req.params.bid, req.params.iid);
  res.status(200).json({ message: "branch item deleted" });
});

module.exports = {
  CreateBranch,
  UpdateBranch,
  AddOneBranchItem,
  GetBranch,
  GetBranches,
  UpdateItemStatus,
  DeleteBranchItem,
  GetBranchItems,
  GetBranchItem,
};
