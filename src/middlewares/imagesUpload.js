const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');


const uploadDir = path.resolve(__dirname, '../images');


const ensureDirExists = promisify(fs.mkdir);
ensureDirExists(uploadDir, { recursive: true }).catch(err => console.error('Error creating upload directory:', err));


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const fileName = `${uniqueSuffix}-${file.originalname}`;
    const fullFilePath = path.join(uploadDir, fileName);
    
    console.log(`File saved at: ${fullFilePath}`); 

    cb(null, fileName); 
  },
});

// File upload middleware
const upload = multer({
  storage: storage,
  limits: { fileSize: 20 * 1024 * 1024 }, 
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, JPG, PNG, and GIF files are allowed.'));
    }
  },
});

// Export the upload middleware
module.exports = { upload };