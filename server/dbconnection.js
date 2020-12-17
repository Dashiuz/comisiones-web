const mongoose = require("mongoose");
const pass = process.env.DBPASS;
const name = process.env.DBNAME;

const db_url = `mongodb+srv://dbadmin:${pass}@hwcomisiones.zwuw9.mongodb.net/${name}?retryWrites=true&w=majority`;

const dbconn = () => {
  mongoose
    .connect(db_url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then((success) => {
      console.log("Database connection has been stablished...");
    })
    .catch((ex) => {
      return console.log("HANDLED ERROR: ", ex);
    });
};

module.exports = dbconn;
