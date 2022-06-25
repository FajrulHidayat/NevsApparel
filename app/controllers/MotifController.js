const {Motif} = require("../models")
const multer = require("multer");
const upload = multer().single("foto");
const axios = require("axios")
const path = require("path");
const resize = require("../services/resize.service");

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
                // if (!validation.success) return res.status(400).json(validation);

      const imagePath = path.join(__dirname, "../../public/image");
      console.log(imagePath);
      const fileUpload = new resize(imagePath);
      console.log(2);
      let foto = await fileUpload.save(req.file.buffer, req.file.originalname);
      console.log(3);
      
      axios.post(`https://api.imgbb.com/1/upload?key=4c40d02b3fab3d334e1c22deb47fbd91&image=https://nevsbe.herokuapp.com/image/${foto}`)
      .then(async function (response) {
        console.log(response);
        imgbbResp=response.data.data.display_url
        const motif = new Motif({
          idDesign: req.body.idDesign,
          urlDesign: imgbbResp,
          
        });
        console.log(imgbbResp);
        console.log(motif);
        const dtMotif = await motif.save();
        return res.status(200).json({ success: true, dtMotif });
    })
            }catch(error){
                console.log(error);
                return res.status(505).json({ success: false, error: error });
            }
            
        })
    }

}

const motifController = new MotifController()
module.exports = motifController