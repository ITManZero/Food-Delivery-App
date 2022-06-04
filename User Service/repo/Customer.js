const { pool, asyncPool } = require("../db");

const { customerQuery } = require("../query");

const createNewCustomer = async (CustomerInfo) => {
  console.log(await asyncPool.query(customerQuery.insert(CustomerInfo)));
  console.log("New Customer!");
};

const getCustomerById = async (id) => {
  await asyncPool.query(customerQuery.findById(id));
  // pool.query(customerQuery.findById(id), function (error, results, fields) {
  //   if (error) throw error;
  //   console.log(JSON.stringify(results[0]));
  // });
};

const findALLCustomers = async (id) => {
  await asyncPool.query(customerQuery.findALLCustomers());
};

const updateOneCustomer = async (id, info) => {
  await asyncPool.query(customerQuery.update(id, info));
};

module.exports = {
  createNewCustomer,
  getCustomerById,
  findALLCustomers,
  updateOneCustomer,
};
