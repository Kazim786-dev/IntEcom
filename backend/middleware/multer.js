import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (!file) {
    // If no file is provided, continue to the next route handler
    return cb(null, true);
  }
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'model/gltf+json' ||
    file.mimetype === 'model/gltf-binary' ||
    file.mimetype === 'application/octet-stream' // For .obj files
  ) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file format'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
}).fields([
  { name: 'image', maxCount: 1 },
  { name: 'model3D', maxCount: 1 }
]);

export default upload;
