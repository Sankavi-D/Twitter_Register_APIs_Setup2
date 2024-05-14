const multer = require('multer');

// Define storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // Specify the directory where files will be stored
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // Adding random part to the filename
    cb(null, uniqueSuffix + '-' + file.originalname); // Specify the file name format
  }
});

// Create multer instance
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 1 * 1024 * 1024 // Limit file size to 1MB
  },
  fileFilter: (req, file, cb) => {
    // Check if the file's MIME type starts with 'image/' and is one of the allowed types
    if (file.mimetype.startsWith('image/') && ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.mimetype)) {
      cb(null, true); // Accept the file
    } else {
      cb(new Error('Only JPEG, PNG, GIF, and WebP images are allowed')); // Reject other file types
    }
  }
});

// Set up Multer for handling file uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname);
//   },
// });
// const upload = multer({ storage: storage });

console.log("Image stored in upload/ next working on db storation");

module.exports = upload;
