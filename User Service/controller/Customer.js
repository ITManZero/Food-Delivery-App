const { catchAsync } = require("../utils");

const {
  findALLCustomers,
  getCustomerById,
  updateOneCustomer,
} = require("../repo");

const getCustomers = catchAsync(async (req, res, next) => {
  await findALLCustomers();
});

const getCustomer = catchAsync(async (req, res, next) => {
  await getCustomerById(req.params.id);
});

const updateCustomer = catchAsync(async (req, res, next) => {
  await updateOneCustomer(req.params.id, req.body);
});

module.exports = { getCustomers, getCustomer, updateCustomer };
