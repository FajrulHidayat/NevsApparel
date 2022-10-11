const { Checkout, Order } = require("../models");
const multer = require("multer");
const upload = multer().single("image");
const axios = require("axios");
const path = require("path");
const resize = require("../services/resize.service");
const fs = require("fs");

class OrderController {
  async CreateCheckout(req, res) {
    let status;
    let message;
    let dtCheckout;
    console.log(req.body);
    const checkout = new Checkout({
      idClient: req.body.idClient,
      idOrder: req.body.idOrder,
      payStatus: "Belum Terbayar",
      paymentReceipt: "",
      price: req.body.price,
      createAt: new Date(),
    });
    console.log(checkout);
    dtCheckout = checkout.save();
    if (dtCheckout) {
      status = 200;
      message = "Checkout Success";
    } else {
      status = 401;
      message = "Checkout Failed";
    }
    return res.status(status).json({ message: message, data: dtCheckout });
  }
  async getAllCheckout(req, res) {
    // console.log("get all checkout");
    try {
      console.log(new Date());
      let status;
      let message;
      let dtCheckout = await Checkout.find();
      let dtCheckoutTemp = [];
      // console.log("get all checkout");
      if (dtCheckout) {
        // console.log("get all checkout");
        await dtCheckout.forEach(async (element, index) => {
          let detailOrder = [];
          let temp;
          for (let index = 0; index < element.idOrder.length; index++) {
            let dtOrder = await Order.findById(element.idOrder[index]);
            detailOrder.push(dtOrder);
          }
          temp = element._doc;
          temp = { ...temp, detailOrder };
          dtCheckoutTemp.push(temp);
          // console.log(index);
          // console.log(dtCheckoutTemp);
          if (
            dtCheckout.length == index + 1 &&
            dtCheckout.length == dtCheckoutTemp.length
          ) {
            // console.log("dtCheckout", dtCheckout.length);
            // console.log("index", index);
            // console.log("dtCheckoutTemp", dtCheckoutTemp.length);
            return res
              .status(status)
              .json({ message: message, data: dtCheckoutTemp });
          }
        });
        status = 200;
        message = "Get All Checkout Success";
        return res.status(status).json({ message: message, data: dtCheckout });
      } else {
        status = 404;
        message = "Checkout is Empty";
        return res.status(status).json({ message: message, data: dtCheckout });
      }
    } catch (err) {
      return res.status(500).json({ err });
    }
  }
  async getAllCheckoutByIdClient(req, res) {
    let status;
    let message;
    let idClient = req.params.idClient;
    let dtCheckout = await Checkout.find({ idClient: idClient }).exec();
    let dtCheckoutTemp = [];

    if (dtCheckout) {
      await dtCheckout.forEach(async (element, index) => {
        let detailOrder = [];
        let temp;
        for (let index = 0; index < element.idOrder.length; index++) {
          let dtOrder = await Order.findById(element.idOrder[index]);
          detailOrder.push(dtOrder);
        }
        temp = element._doc;
        temp = { ...temp, detailOrder };
        dtCheckoutTemp.push(temp);
        if (dtCheckout.length == index + 1) {
          return res
            .status(status)
            .json({ message: message, data: dtCheckoutTemp });
        }
      });
      status = 200;
      message = "Get Checkout Success";
    } else {
      status = 404;
      message = "Checkout not found";
      return res.status(status).json({ message: message, data: dtCheckout });
    }
  }
  async getAllCheckoutByIdCheckout(req, res) {
    let status;
    let message;
    let id = req.params.id;
    let dtCheckout = await Checkout.findById(id);
    let dtCheckoutTemp = [];

    if (dtCheckout) {
      let detailOrder = [];
      let temp;
      for (let index = 0; index < dtCheckout.idOrder.length; index++) {
        let dtOrder = await Order.findById(dtCheckout.idOrder[index]);
        detailOrder.push(dtOrder);
      }
      temp = dtCheckout._doc;
      temp = { ...temp, detailOrder };
      dtCheckoutTemp.push(temp);

      status = 200;
      message = "Get Checkout Success";
      return res
        .status(status)
        .json({ message: message, data: dtCheckoutTemp });
    } else {
      status = 404;
      message = "Checkout not found";
      return res.status(status).json({ message: message, data: dtCheckout });
    }
  }

  async updateStatus(req, res) {
    let status;
    let message;
    let id = req.params.id;
    let payStatus = req.body.payStatus;
    let dtCheckout = await Checkout.updateOne(
      { _id: id },
      { payStatus: payStatus }
    );

    if (dtCheckout) {
      status = 200;
      message = "Update Status Checkout Success";
    } else {
      status = 404;
      message = "Update Status Checkout not found";
    }
    return res.status(status).json({ message: message, data: dtCheckout });
  }
  //   async updateProcess(req, res) {
  //     let status;
  //     let message;
  //     let idOrder = req.params.idOrder;
  //     let process = req.body.process;
  //     let dtOrder = await Order.updateOne({ _id: idOrder }, { process: process });

  //     if (dtOrder) {
  //       status = 200;
  //       message = "Update Process Order Success";
  //     } else {
  //       status = 404;
  //       message = "Update Process Order not found";
  //     }
  //     return res.status(status).json({ message: message, data: dtOrder });
  //   }
  async UpdatePaymentReceipt(req, res) {
    upload(req, res, async function (err) {
      let status;
      let message;
      let dtOrder;
      let imgbbResp;
      let id = req.params.id;
      if (err instanceof multer.MulterError) {
        return res.status(200).json(err);
      } else if (err) {
        return res.status(200).json(err);
      }
      // console.log(req.file);

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
            let dtCheckout = await Checkout.updateOne(
              { _id: id },
              { paymentReceipt: imgbbResp }
            );

            if (dtCheckout) {
              status = 200;
              message = "Update Payment Receipt Success";
            } else {
              status = 404;
              message = "Update Payment Receipt Failled";
            }
            return res
              .status(status)
              .json({ message: message, data: dtCheckout });
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
}

const orderController = new OrderController();
module.exports = orderController;
