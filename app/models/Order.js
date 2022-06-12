const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  orderEmail: {
    type: String,
    required: true,
  },
  orderName:{
    type:String,
  },
  orderPhone:{
    type:String,
  },
  pickUpDate:{
    type:String,
  },
  collar: {
    type: String,
    required: true,
  },
  sleeve: {
    type: String,
    required: true,
  },
  font:{
    type:String,
  },
  cloth:{
    type:String,
  },
  motive:{
    type:String,
  },
  players:[{
    name:String,
    backNumber:String,
    size:String
  }]
  
});

module.exports = mongoose.model("Order", OrderSchema);
