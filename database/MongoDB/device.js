const mongoose = require("./Mongoose");
const Time = require("../GetTime");

const schema = new mongoose.Schema({
  MAC: String,
  IP: String,
  Name: String,
  Static: Boolean,
  ReserveTime: Number,
  Options: {
    DNS: Array,
    ExpireTime: Number,
    Router: String,
  },
});

schema.static("getAll", function () {
  return this.find();
});

schema.static("getByMAC", function (mac) {
  return this.find({ MAC: mac });
});

schema.static("getByIP", function (ip) {
  return this.find({ IP: ip });
});

schema.static("saveNew", function (mac, ip, options) {
  return new this({
    MAC: mac,
    IP: ip,
    Name: Time.string,
    Static: false,
    ReserveTime: Time.decimal,
    Options: options,
  }).save();
});

schema.static("removeByIP", function (ip) {
  return this.deleteMany({ IP: ip });
});

module.exports = mongoose.model("Devices", schema);
