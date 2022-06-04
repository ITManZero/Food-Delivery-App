const router = require("express").Router();

const {
  GetCategory,
  GetCategories,
  CreateCategory,
  UpdateCategory,
} = require("../controller");

router.get("/:cid", GetCategory);

router.get("/", GetCategories);

router.post("/create", CreateCategory);

router.put("/:cid/update", UpdateCategory);

// router.put("/delete", (req, res, next) => {});

module.exports.CategoryRouter = router;
