const express = require("express");

require("dotenv").config();

const { ConnectToMongoDB } = require("./DB");

const { BranchRouter, CategoryRouter, MenuItemRouter } = require("./routes");

const ErrorHandler = require("./middleware/ErrorHandler");

ConnectToMongoDB();

const app = express();

app.use(express.json());

app.use("/items", MenuItemRouter);

app.use("/branches", BranchRouter);

app.use("/categories", CategoryRouter);

app.use(ErrorHandler);

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
