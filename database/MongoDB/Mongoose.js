const mongoose = require("mongoose");

mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose;
