const multer = require('multer');
const path = require('path');

// Define storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // directory where files will be stored
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // Adding random part to the filename
    cb(null, uniqueSuffix + '-' + file.originalname); // Specify the file name format
  }
});

// Custom file filter for image uploads
const imageFileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif|webp/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG, PNG, GIF, and WebP images are allowed'), false);
  }
};

// Custom file filter for video uploads
const videoFileFilter = (req, file, cb) => {
  const filetypes = /mp4|mov|avi|mkv/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(new Error('Only MP4, MOV, AVI, and MKV videos are allowed'), false);
  }
};

// Create multer instance for image upload with custom validation
const uploadImage = multer({
  storage: storage,
  limits: {
    fileSize: 1 * 1024 * 1024 // Limit file size to 1MB
  },
  fileFilter: (req, file, cb) => {
    imageFileFilter(req, file, cb);
  }
}).array('image');

// Create multer instance for video upload with custom validation
const uploadVideo = multer({
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024 // Limit file size to 100MB
  },
  fileFilter: (req, file, cb) => {
    videoFileFilter(req, file, cb);
  }
}).single('video');

// Middleware to check if files are present for image upload
const checkImageFiles = (req, res, next) => {
  uploadImage(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ status_code: 400, message: err.message });
    } else if (err) {
      return res.status(400).json({ status_code: 400, message: err.message });
    } else if (!req.files || req.files.length === 0) {
      return res.status(400).json({ status_code: 400, message: 'No files selected' });
    }
    next();
  });
};

// Middleware to check if files are present for video upload
const checkVideoFile = (req, res, next) => {
  uploadVideo(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ status_code: 400, message: err.message });
    } else if (err) {
      return res.status(400).json({ status_code: 400, message: err.message });
    }
    next();
  });
};

module.exports = { uploadImage, uploadVideo, checkImageFiles, checkVideoFile };

// // Custom file filter for image uploads
// const imageFileFilter = (req, file, cb) => {
//   const filetypes = /jpeg|jpg|png|gif|webp/;
//   const mimetype = filetypes.test(file.mimetype);
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

//   if (mimetype && extname) {
//     cb(null, true);
//   } else {
//     cb(new Error('Only JPEG, PNG, GIF, and WebP images are allowed'), false);
//   }
// };

// // Custom file filter for video uploads
// const videoFileFilter = (req, file, cb) => {
//   const filetypes = /mp4|mov|avi|mkv/;
//   const mimetype = filetypes.test(file.mimetype);
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

//   if (mimetype && extname) {
//     cb(null, true);
//   } else {
//     cb(new Error('Only MP4, MOV, AVI, and MKV videos are allowed'), false);
//   }
// };

// // Create multer instance for image upload with custom validation
// const uploadImage = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1 * 1024 * 1024 // Limit file size to 1MB
//   },
//   fileFilter: (req, file, cb) => {
//     imageFileFilter(req, file, cb);
//   }
// }).array('image');

// // Create multer instance for video upload with custom validation
// const uploadVideo = multer({
//   storage: storage,
//   limits: {
//     fileSize: 100 * 1024 * 1024 // Limit file size to 100MB
//   },
//   fileFilter: (req, file, cb) => {
//     videoFileFilter(req, file, cb);
//   }
// }).single('video');

// // Middleware to check if files are present
// const checkFiles = (req, res, next) => {
//   uploadImage(req, res, function (err) {
//     if (err instanceof multer.MulterError) {
//       return res.status(400).json({ status_code: 400, message: err.message });
//     } else if (err) {
//       return res.status(400).json({ status_code: 400, message: err.message });
//     } else if (!req.files || req.files.length === 0) {
//       return res.status(400).json({ status_code: 400, message: 'No files uploaded' });
//     }
//     next();
//   });
// };

// module.exports = { uploadImage, uploadVideo, checkFiles };

// // Custom file filter to check for image type and presence of files
// const imageFileFilter = (req, file, cb) => {
//   const filetypes = /jpeg|jpg|png|gif|webp/;
//   const mimetype = filetypes.test(file.mimetype);
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

//   if (mimetype && extname) {
//     cb(null, true);
//   } else {
//     cb(new Error('Only JPEG, PNG, GIF, and WebP images are allowed'), false);
//   }
// };

// // Create multer instance for image upload with custom validation
// const uploadImage = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1 * 1024 * 1024 // Limit file size to 1MB
//   },
//   fileFilter: (req, file, cb) => {
//     imageFileFilter(req, file, cb);
//   }
// }).array('image');

// // Create multer instance for video upload
// const uploadVideo = multer({
//   storage: storage,
//   limits: {
//     fileSize: 100 * 1024 * 1024 // Limit file size to 100MB
//   },
//   fileFilter: (req, file, cb) => {
//     const filetypes = /mp4|mov|avi|mkv/;
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = filetypes.test(file.mimetype);

//     if (mimetype && extname) {
//       return cb(null, true);
//     } else {
//       cb(new Error('Only MP4, MOV, AVI, and MKV videos are allowed'));
//     }
//   }
// });

// // Middleware to check if files are present
// const checkFiles = (req, res, next) => {
//   uploadImage(req, res, function (err) {
//     if (err instanceof multer.MulterError) {
//       return res.status(400).json({ status_code: 400, message: err.message });
//     } else if (err) {
//       return res.status(400).json({ status_code: 400, message: err.message });
//     } else if (!req.files || req.files.length === 0) {
//       return res.status(400).json({ status_code: 400, message: 'No files uploaded' });
//     }
//     next();
// });

// // Create multer instance for image upload
// const uuploadImage = multer({ 
//   storage: storage,
//   limits: {
//     fileSize: 1 * 1024 * 1024 // Limit file size to 1MB
//   },
//   fileFilter: (req, file, cb) => {
//     // Check if the file's MIME type starts with 'image/' and is one of the allowed types
//     if (file.mimetype.startsWith('image/') && ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.mimetype)) {
//       cb(null, true); // Accept the file
//     } else {
//       cb(new Error('Only JPEG, PNG, GIF, and WebP images are allowed')); // Reject other file types
//     }
//   }
// });



// // Set up Multer for handling file uploads
// // const storage = multer.diskStorage({
// //   destination: function (req, file, cb) {
// //     cb(null, 'uploads/');
// //   },
// //   filename: function (req, file, cb) {
// //     cb(null, Date.now() + '-' + file.originalname);
// //   },
// // });
// // const upload = multer({ storage: storage });

// console.log("Image stored in upload/ next working on db storation");

// module.exports = {
//   uploadImage,
//   uploadVideo
// };
