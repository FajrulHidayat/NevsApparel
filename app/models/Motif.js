const mongoose = require("mongoose");

const MotifSchema = mongoose.Schema({
  idDesign: {
    type: String,
    required: true,
  },
  urlDesign:{
    type:String,
  },
  
});

module.exports = mongoose.model("Motif", MotifSchema);
