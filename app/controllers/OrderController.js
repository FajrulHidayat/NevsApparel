const { Order } = require("../models");
const multer = require("multer");
const upload = multer().single("image");
const axios = require("axios");
const path = require("path");
const resize = require("../services/resize.service");
const fs = require("fs");

class OrderController {
  async Order(req, res) {
    upload(req, res, async function (err) {
      let status;
      let message;
      let dtOrder;
      let imgbbResp;
      if (err instanceof multer.MulterError) {
        return res.status(200).json(err);
      } else if (err) {
        return res.status(200).json(err);
      }
      console.log(req.file);

      try {
        // if (!validation.success) return res.status(400).json(validation);

        const imagePath = path.join(__dirname, "../../public/image");
        if (!fs.existsSync(imagePath)) {
          fs.mkdirSync(imagePath, { recursive: true });
        }
        const fileUpload = new resize(imagePath);
        let foto = await fileUpload.save(
          req.file.buffer,
          req.file.originalname
        );
        axios
          .post(
            `https://api.imgbb.com/1/upload?key=4c40d02b3fab3d334e1c22deb47fbd91&image=https://nevsbe.herokuapp.com/image/${foto}`
          )
          .then(async function (response) {
            imgbbResp = response.data.data.display_url;
            const order = new Order({
              orderEmail: req.body.orderEmail,
              orderName: req.body.orderName,
              orderPhone: req.body.orderPhone,
              pickUpDate: req.body.pickUpDate,
              fontPlayerName: req.body.fontPlayerName,
              fontBackNumber: req.body.fontBackNumber,
              cloth: req.body.cloth,
              motive: req.body.motive,
              players: JSON.parse(req.body.players),
              sample: imgbbResp,
            });
            console.log(req.body.players);
            console.log(order);
            dtOrder = order.save();
            if (dtOrder) {
              status = 200;
              message = "Order Success";
            } else {
              status = 401;
              message = "Order Failed";
            }
            return res.status(status).json({ message: message, data: dtOrder });
          })
          .catch((err) => {
            console.log(err);
            message = err;
            return res.status(505).json({ success: true, error: err });
          });
      } catch (error) {
        console.log(error);
        return res.status(505).json({ success: false, error: error });
      }
    });
  }
  async getAllOrder(req, res) {
    let status;
    let message;
    let dtOrder = Order.find();

    if (dtOrder) {
      status = 200;
      message = "Get All Oder Success";
    } else {
      status = 404;
      message = "Order is Empty";
    }

    return res.status(status).json({ message: message, data: dtOrder });
  }
}

const orderController = new OrderController();
module.exports = orderController;
