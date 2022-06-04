const router = require("express").Router();

const {
  CreateBranch,
  AddOneBranchItem,
  UpdateBranch,
  GetBranch,
  GetBranches,
  GetBranchItem,
  GetBranchItems,
  UpdateItemStatus,
  DeleteBranchItem,
} = require("../controller");

/* Branch */

router.get("/", GetBranches);

router.get("/:bid", GetBranch);

router.post("/create", CreateBranch);

router.put("/:bid/update", UpdateBranch);

// router.delete("/delete", (req, res, next) => {});

/* Branch Item */

router.get("/:bid/items", GetBranchItems);

router.get("/:bid/items/:biid", GetBranchItem);

router.post("/:bid/items/:iid/add", AddOneBranchItem);

router.put("/:bid/items/:iid/update", UpdateItemStatus);

router.delete("/:bid/items/:iid/delete", DeleteBranchItem);

module.exports.BranchRouter = router;
