const {Order} = require("../models")

class OrderController{
    async Order(req,res){
        let status;
        let message;
        let dtOrder
        const order = new Order({
            orderEmail:req.body.orderEmail,
            orderName:req.body.orderName,
            orderPhone:req.body.orderPhone,
            pickUpDate:req.body.pickUpDate,
            collar:req.body.collar,
            sleeve:req.body.sleeve,
            font:req.body.font,
            cloth:req.body.cloth,
            motive:req.body.motive,
            players:req.body.players,
        })
        dtOrder = order.save();
        if (dtOrder) {
            status=200
            message="Order Success"
          } else {
            status=401
            message="Order Failed"
          }
          return res.status(status).json({message:message,data:dtOrder})
    }
    async getAllOrder(req,res){
        let status;
        let message;
        let dtOrder = Order.find();
        
        if (dtOrder) {
            status=200;
            message="Get All Oder Success"
        } else {
            status=404
            message="Order is Empty"
        }

        return res.status(status).json({message:message,data:dtOrder})
        
    }
}