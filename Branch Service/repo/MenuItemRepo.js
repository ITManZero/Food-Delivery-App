const { MenuItem } = require("../model");

const {
  DuplicateKeyError,
  NotFoundError,
  BadRequestError,
} = require("../handler/AppError");

//handling errors

//////////////////////////////////////////////////////////////////////

/*
findOne(conditions... , projection... ,options... ,callback)
findById(id, , projection... ,options... ,callback)

conditions_ex : { "Items.Avaliable":true , Name:Midan}
projection_ex : { -_id  Items} selecting query
options_ex : { sort , limit } find full documentation on mongoose docs

*/

const FindAllItems = async () => {
  // filter - projection - option - callback
  return await MenuItem.find(null, { Branches: 0, __v: 0 });
};

const FindItemByID = async (ItemID) => {
  // id - projection - option - callback
  const item = await MenuItem.findById(ItemID, { Branches: 0, __v: 0 });
  if (!item) throw new NotFoundError("item not found");
  return { ...item._doc };
};

const FindBranchesStatus = async (ItemID, status) => {
  const item = await MenuItem.findById(ItemID)
    .select("-Branches._id")
    .populate({
      path: "Branches.BranchID",
      select: "Name Online Hidden -_id",
    });
  if (!item) throw NotFoundError("item not found");
  return item.Branches.map((branch) => branch.BranchID);
};

const AddNewItem = async ({
  Name,
  Desc,
  Categories,
  Ingredients,
  Price,
  Offer,
  Hidden,
  Branches,
}) => {
  Branches = Branches.map((branch) => {
    return { BranchID: branch.BranchID };
  });

  const item = new MenuItem({
    Name,
    Desc,
    Categories,
    Ingredients,
    Price,
    Offer,
    Hidden,
    Branches,
  });
  await item.save();
  return item._id;
};

const CheckItem = async (BranchID, ItemID) => {
  const item = await MenuItem.findOne(
    { _id: ItemID },
    {
      Branches: {
        $elemMatch: {
          BranchID: BranchID,
        },
      },
    }
  );
  if (!item) throw new NotFoundError("item not found");
  if (item.Branches.length > 0)
    throw new BadRequestError("already exist branch");
};

const PushBranch = async (BranchID, ItemID) => {
  const { modifiedCount } = await MenuItem.updateOne(
    { _id: ItemID },
    {
      $push: {
        Branches: { BranchID: BranchID },
      },
    }
  );
  if (modifiedCount < 1)
    throw new BadRequestError("branch did't add to MenuItem");
};

const DeleteOneItem = async (ItemID) => {
  const item = await MenuItem.findOneAndDelete({ _id: ItemID });
  if (!item) throw new NotFoundError("not found item");
  return item.Branches;
};

const PullBranch = async (BranchID, ItemID) => {
  const { modifiedCount } = await MenuItem.updateOne(
    {
      _id: ItemID,
    },
    {
      $pull: {
        Branches: { BranchID: BranchID },
      },
    }
  );
  if (modifiedCount < 1)
    throw new BadRequestError("branch did not delete from item");
};

const UpdateOneItem = async (
  ItemID,
  { Name, Desc, Categories, Ingredients, Price, Offer, Hidden, Branches }
) => {
  const item = await MenuItem.findByIdAndUpdate(ItemID, {
    Name,
    Desc,
    Categories,
    Ingredients,
    Price,
    Offer,
    Hidden,
    Branches,
  });
  if (!item) throw new NotFoundError("item not found");
};

module.exports = {
  AddNewItem,
  PushBranch,
  PullBranch,
  CheckItem,
  DeleteOneItem,
  UpdateOneItem,
  FindItemByID,
  FindAllItems,
  FindBranchesStatus,
};

// return await MenuItem.aggregate([
//   {
//     $match: {
//       _id: require("mongoose").Types.ObjectId(ItemID),
//     },
//   },

//   {
//     $lookup: {
//       from: "branches",
//       localField: "BranchesStatus.BranchID",
//       foreignField: "_id",
//       as: "modifierStatus",
//     },
//   },
//   {
//     $addFields: {
//       modifierStatus: {
//         $map: {
//           input: "$BranchesStatus",
//           as: "m",
//           in: {
//             $mergeObjects: [
//               {
//                 $arrayElemAt: [
//                   /** As filter would only get one object (cause you'll have only one matching doc in modifieritems coll for each "modifierList.modifierId", So getting first element out of array, else you need to take this array into an object & merge that field to particular object of 'modifierList') */
//                   {
//                     $filter: {
//                       input: "$modifierStatus",
//                       cond: {
//                         $eq: ["$$this._id", "$$m.BranchID"],
//                       },
//                     },
//                   },
//                   0,
//                 ],
//               },
//               "$$m",
//             ],
//           },
//         },
//       },
//     },
//   },

//   {
//     $addFields: {
//       authors: {
//         $map: {
//           input: "$modifierStatus",
//           as: "modifier",
//           in: {
//             Name: "$$modifier.Name",
//             Avaliable: "$$modifier.Avaliable",
//           },
//         },
//       },
//     },
//   },
//   projectPipeline,
// ]);
