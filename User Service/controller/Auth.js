const { catchAsync } = require("../utils");

const { createNewCustomer, getCustomerById } = require("../repo");

const jwt = require("jsonwebtoken");

const customerRegister = catchAsync(async (req, res, next) => {
  await createNewCustomer(req.body);

  res.send("success");
});

const customerLogin = catchAsync(async (req, res, next) => {
  await getCustomerById(1);
});

module.exports = { customerRegister, customerLogin };
