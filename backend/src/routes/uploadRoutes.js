import express from 'express';
import multer from 'multer';
import path from 'path';
import { protect } from '../middleware/auth.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|webp|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Images only!');
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post('/', protect, upload.single('image'), (req, res) => {
  if (req.file) {
    // Return relative path to be stored in DB
    res.json({ success: true, url: `/uploads/${req.file.filename}` });
  } else {
    res.status(400).json({ success: false, message: 'No file uploaded' });
  }
});

export default router;
