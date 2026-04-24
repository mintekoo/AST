// src/utils/multer.js
import multer from 'multer';
import path from 'path';
import fs from 'fs';

/**
 * folderPath can be a string with slashes or an array
 * e.g. 'users/profile/group' OR ['users', 'profile', 'group']
 */
export const createMulter = (folderPath = '') => {
  const baseUploadDir = path.join(process.cwd(), 'uploads');

  // If array, join into path
  const subPath = Array.isArray(folderPath)
    ? path.join(...folderPath)
    : folderPath;

  const uploadPath = path.join(baseUploadDir, subPath);

  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadPath),
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });

  const upload = multer({ storage });

  const buildRelativePaths = files => {
    if (!files) return [];
    return files.map(f => path.join('uploads', subPath, f.filename));
  };

  return { upload, buildRelativePaths };
};
