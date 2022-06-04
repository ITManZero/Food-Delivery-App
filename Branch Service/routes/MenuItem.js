const router = require("express").Router();

const {
  CreateItem,
  DeleteItem,
  UpdateItem,
  GetItem,
  GetItems,
  GetBranchesStatus,
} = require("../controller");

router.get("/", GetItems);

router.get("/:iid", GetItem);

router.get("/:iid/branches_status", GetBranchesStatus);

router.post("/create", CreateItem);

router.put("/:iid/update", UpdateItem);

router.delete("/:iid/delete", DeleteItem);

module.exports.MenuItemRouter = router;
