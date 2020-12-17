require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dbconn = require("./dbconnection");
const { handleError } = require("./middleware/errorHandler");

const app = express();

dbconn();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/files", require("./routes/excel"));

const port = process.env.PORT || 4000;

app.use((err, req, res, next) => {
  handleError(err, res);
});

app.listen(port, function () {
  console.log("the server started at port ", port);
});
