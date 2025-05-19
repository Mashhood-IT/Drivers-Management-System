const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const path = require("path"); 

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,

  
  params: {
    folder: "driver_uploads",
    allowed_formats: [ "jpeg",  "pdf" , "png" , "jpg"],
    resource_type: "auto",
    type:"upload",
    public_id: (req, file) => {
      const uniqueSuffix = Date.now();
      let ext = path.extname(file.originalname);
      let baseName = path.basename(file.originalname, ext); 
      ext = ext === '.pdf' ? '.pdf' : ''; 
      return `${uniqueSuffix}-${baseName}${ext}`;
    }
    
  },
  
});

const upload = multer({ storage });
  
module.exports = upload;
