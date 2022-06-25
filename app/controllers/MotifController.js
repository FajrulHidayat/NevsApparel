const {Model} = require("../models")
const multer = require("multer");
const upload = multer().single("foto");
const axios = require("axios")

class MotifController {
    async uploadImage(req,res){
        upload(req,res, async function (err) {
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

            try{
                console.log(req.file);
                return res.status(200).json({ success: true,data:" error: error "});

            }catch(error){
                return res.status(505).json({ success: false, error: error });
            }
            
        })
    }

}

const motifController = new MotifController()
module.exports = motifController