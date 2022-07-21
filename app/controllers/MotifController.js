const { Motif } = require("../models");
const multer = require("multer");
const upload = multer().single("foto");
const axios = require("axios");
const path = require("path");
const resize = require("../services/resize.service");
const fs = require("fs");

class MotifController {
  async uploadImage(req, res) {
    upload(req, res, async function (err) {
      req.start = Date.now();
      let status;
      let message;
      let dtMotif;
      let imgbbResp;
      if (err instanceof multer.MulterError) {
        return res.status(200).json(err);
      } else if (err) {
        return res.status(200).json(err);
      }

      try {
        // if (!validation.success) return res.status(400).json(validation);

        const imagePath = path.join(__dirname, "../../public/image");
        if (!fs.existsSync(imagePath)) {
          fs.mkdirSync(imagePath, { recursive: true });
        }
        console.log(imagePath);
        const fileUpload = new resize(imagePath);
        console.log(2);
        let foto = await fileUpload.save(
          req.file.buffer,
          req.file.originalname
        );
        console.log(3);

        axios
          .post(
            `https://api.imgbb.com/1/upload?key=4c40d02b3fab3d334e1c22deb47fbd91&image=https://nevsbe.herokuapp.com/image/${foto}`
          )
          .then(async function (response) {
            imgbbResp = response.data.data.display_url;
            const motif = new Motif({
              idDesign: req.body.idDesign,
              urlDesign: imgbbResp,
            });
            const dtMotif = await motif.save();
            return res.status(200).json({ success: true, dtMotif });
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
  async getAllMotif(req, res) {
    let status;
    let message;
    let dtMotif = await Motif.find();

    if (dtMotif) {
      status = 200;
      message = "Get All Motif Success";
    } else {
      status = 404;
      message = "Motif is Empty";
    }
    return res.status(status).json({ message: message, dtMotif });
  }
  async getMotifbyidDesign(req, res) {
    let status;
    let message;
    let idDesign = req.params.idDesign;
    let dtMotif = await Motif.findOne({ idDesign: idDesign });

    if (dtMotif) {
      status = 200;
      message = "Get Motif Success";
    } else {
      status = 404;
      message = "Motif not found";
    }
    return res.status(status).json({ message: message, dtMotif });
  }
  async getAllMotifbyMotif(req, res) {
    let status;
    let message;
    // let idDesign = req.params.idDesign;
    let dtMotif = await Motif.find({ idDesign: /11$/ });

    if (dtMotif) {
      status = 200;
      message = "Get Motif Success";
    } else {
      status = 404;
      message = "Motif not found";
    }
    return res.status(status).json({ message: message, dtMotif });
  }
  async DeleteAllMotif(req, res) {
    let status;
    let message;
    // let idDesign = req.params.idDesign;
    let dtMotif = await Motif.deleteMany();

    if (dtMotif) {
      status = 200;
      message = "Delete All Motif Success";
    } else {
      status = 404;
      message = "Delete All Motif Failed";
    }
    return res.status(status).json({ message: message, dtMotif });
  }
}

const motifController = new MotifController();
module.exports = motifController;
