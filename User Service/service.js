const express = require("express");

const ErrorHandler = require("./middleware/ErrorHandler");

const { Auth, Order, Employee, Customer } = require("./routes");

require("dotenv").config();

require("./db");

const app = express();

app.use(express.json());

app.use("/auth", Auth);

app.use("/customers", Customer);

app.use("/employees", Employee);

app.use("/orders", Order);

app.use(ErrorHandler);

app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});
