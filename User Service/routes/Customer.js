const router = require("express").Router();

const { getCustomer, getCustomers, updateCustomer } = require("../controller");

router.get("/", getCustomers);

router.get("/:cid", getCustomer);

router.put("/:cid/update", updateCustomer);

module.exports.Customer = router;
