import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      //console.log("📥 Saving to ./public/temp");
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      //console.log("📝 Incoming file name:", file.originalname);
      cb(null, file.originalname)
    }
  })
  
export const upload = multer({ 
    storage, 
})