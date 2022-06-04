const { Branch } = require("../model");

const {
  DuplicateKeyError,
  NotFoundError,
  BadRequestError,
} = require("../handler/AppError");

/* Branch */

const FindAllBranches = async () => {
  return await Branch.find();
};

const FindBranchByID = async (BranchID) => {
  const branch = await Branch.findById(BranchID);
  if (!branch) throw new NotFoundError("branch not found");
  return branch;
};

const AddNewBranch = async (BranchDetails) => {
  try {
    const branch = new Branch(BranchDetails);
    await branch.save();
  } catch (err) {
    if (err.name === "MongoServerError" && err.code === 11000)
      throw new DuplicateKeyError("branch name already exists");
  }
};

const UpdateOneBranch = async (BranchID, BranchDetails) => {
  const { matchedCount, modifiedCount } = await Branch.updateOne(
    { _id: BranchID },
    BranchDetails
  );
  if (matchedCount < 1) throw new NotFoundError("branch not found");
  if (modifiedCount < 1)
    throw new BadRequestError("branch did not update,there is nothing changed");
};

/* Branch Item */

const FindAllBranchItems = async (BranchID) => {
  const branch = await Branch.findById(BranchID, "Items -_id")
    .populate({
      path: "Items.MenuItemId",
      select:
        "Name Desc Categories Ingredients FavScore OrderScore Price Offer",
    })
    .exec();
  if (!branch) throw new NotFoundError("branch not found");
  const items = [];
  for (item of branch.Items) {
    items.push({ ...item.MenuItemId._doc, Published: item.Published });
  }
  return items;
};

const FindBranchItemByID = async (BranchID, BranchItemID) => {
  let branch;
  try {
    branch = await Branch.findById(
      {
        _id: BranchID,
      },
      {
        Items: {
          $elemMatch: {
            _id: BranchItemID,
          },
        },
      }
    )
      .populate({
        path: "Items.MenuItemId",
        select:
          "Name Desc Categories Ingredients FavScore OrderScore Price Offer",
      })
      .exec();
  } catch (err) {
    if (err.name === "MongoServerError" && err.code === 51270)
      throw new NotFoundError("invalid id, branch item not found");
  }
  if (!branch) throw new NotFoundError("branch not found");
  else if (branch.Items.length == 0)
    throw new NotFoundError("branch item not found");
  return {
    ...branch.Items[0].MenuItemId._doc,
    Published: branch.Items[0].Published,
  };
};

const CheckBranch = async (BranchID, ItemID, isPush = true) => {
  let branch;
  try {
    branch = await Branch.findOne(
      { _id: BranchID },
      {
        Items: {
          $elemMatch: {
            MenuItemId: ItemID,
          },
        },
      }
    );
  } catch (err) {
    if (err.name === "MongoServerError" && err.code === 51270)
      throw new NotFoundError("invalid id, item not found");
  }
  if (!branch) throw new NotFoundError("branch not found");
  if (isPush) {
    if (branch.Items.length > 0)
      throw new BadRequestError("already exist branch item");
  } else if (branch.Items.length == 0)
    throw new NotFoundError("not found branch item");
};

const AddBranchItem = async ({ BranchID, Published }, ItemID) => {
  const { modifiedCount } = await Branch.updateOne(
    {
      _id: BranchID,
    },
    {
      $push: {
        Items: { MenuItemId: ItemID, Published },
      },
    }
  );
  if (modifiedCount < 1) throw new BadRequestError("branch item did not add");
};

const ChangeItemStatus = async (BranchID, ItemID, Published) => {
  const { modifiedCount } = await Branch.updateOne(
    {
      _id: BranchID,
      Items: { $elemMatch: { MenuItemId: ItemID } },
    },
    {
      $set: {
        "Items.$.Published": Published,
      },
    }
  );
  if (modifiedCount < 1)
    throw new BadRequestError(
      "branch item status did not update, there is no changes"
    );
};

const DeleteOneBranchItem = async (BranchID, ItemID) => {
  const { modifiedCount } = await Branch.updateOne(
    {
      _id: BranchID,
    },
    {
      $pull: {
        Items: { MenuItemId: ItemID },
      },
    }
  );
  if (modifiedCount < 1)
    throw new BadRequestError("branch item did not delete");
};

module.exports = {
  FindBranchByID,
  FindAllBranches,
  FindBranchItemByID,
  FindAllBranchItems,
  AddNewBranch,
  CheckBranch,
  UpdateOneBranch,
  ChangeItemStatus,
  AddBranchItem,
  DeleteOneBranchItem,
};
