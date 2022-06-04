const router = require("express").Router();

const {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controller");

router.get("/", getEmployees);

router.get("/:eid", getEmployee);

router.post("/create", createEmployee);

router.put("/:eid/update", updateEmployee);

router.delete("/:eid/delete", deleteEmployee);

module.exports.Employee = router;
