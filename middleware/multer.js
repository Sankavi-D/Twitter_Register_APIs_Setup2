const multer = require('multer');

// Define storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // Specify the directory where files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Specify the file name format
  }
});

// Create multer instance
const upload = multer({ storage: storage });
console.log("Image stored in upload/ next working on db storation");

module.exports = upload;
