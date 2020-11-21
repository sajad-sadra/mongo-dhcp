const mongoose = require("./Mongoose");

const schema = new mongoose.Schema({
  Day: String,
  Time: String,
  Contex: String,
});

schema.static("store", function (day, time, str) {
  return new this({
    Day: day,
    Time: time,
    Contex: str,
  }).save();
});

module.exports = mongoose.model("Logs", schema);