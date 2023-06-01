const express = require("express");
const bodyParser = require("body-parser");
const databaseConnect = require("./services/database-connect.services");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

databaseConnect();

const apiIndexRouter = require("./routes/index");
const apiUserRouter = require("./routes/user");
const apiAdminRouter = require("./routes/admin");
const apiEmployerRouter = require("./routes/employer");

app.use("/api", apiIndexRouter);
app.use("/api/user-panel", apiUserRouter);
app.use("/api/admin-panel", apiAdminRouter);
app.use("/api/employer-panel", apiEmployerRouter);

app.listen(5000);

module.exports = app;
