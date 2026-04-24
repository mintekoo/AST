// src/utils/deleteFile.js

import fs from 'fs';
import path from 'path';

export const deleteFile = relativeFilePath => {
  if (!relativeFilePath) return;

  // Trim whitespace
  const cleanPath = relativeFilePath.trim().replace(/\\/g, '/');

  const uploadsRoot = path.resolve(process.cwd(), 'uploads');
  const absolutePath = path.resolve(process.cwd(), cleanPath);

  console.log('[FileUtil] Trying to delete:', absolutePath);

  // Safety check
  if (
    !absolutePath.startsWith(uploadsRoot + path.sep) &&
    absolutePath !== uploadsRoot
  ) {
    console.warn(`[FileUtil] Blocked delete attempt: ${absolutePath}`);
    return;
  }

  if (fs.existsSync(absolutePath)) {
    try {
      fs.unlinkSync(absolutePath);
      console.log(`[FileUtil] Deleted file: ${absolutePath}`);
    } catch (err) {
      console.error(`[FileUtil] Error deleting file ${absolutePath}:`, err);
    }
  } else {
    console.warn(`[FileUtil] File not found: ${absolutePath}`);
  }
};
