const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const operatorSchema = new Schema({
  operator: { type: String, default: "" },
});

const operatorData = mongoose.model("operators", operatorSchema);

module.exports = operatorData;
