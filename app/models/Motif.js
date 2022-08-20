const mongoose = require("mongoose");

const MotifSchema = mongoose.Schema({
  idDesign: {
    type: String,
    required: true,
  },
  urlDesign: {
    type: String,
  },
  price: { type: Number },
});

module.exports = mongoose.model("Motif", MotifSchema);
