import multer from "multer";
import path from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadPath = path.join(__dirname, 'public');  // Absolute path
      cb(null, "./public")
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname)
    }
  });
  
export const upload = multer({ 
    storage, 
});