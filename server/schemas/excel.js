const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const excelSchema = new Schema({
  excel: [],
});

const ExcelData = mongoose.model("excelData", excelSchema);

module.exports = ExcelData;
