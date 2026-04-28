// src/controllers/categories.controller.js
import { asyncHandler } from '#errors/errorHandler.js';
import { categoryService } from '#services/categories.service.js';
import { deleteFile } from '#utils/deleteFile.js';
import { createMulter } from '#utils/multer.js';

// Multer setup
const { upload: documentUpload, buildRelativePaths } = createMulter([
  'categories',
]);

export const singleDocumentUpload = documentUpload;

export const categoryController = {
  // ✅ Create
  create: asyncHandler(async (req, res) => {
    const { title, typeIs } = req.body;

    const image = req.file ? buildRelativePaths([req.file])[0] : null;

    const category = await categoryService.create({
      title,
      typeIs,
      image,
    });

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: category,
    });
  }),

  // ✅ Update
  update: asyncHandler(async (req, res) => {
    const { title, typeIs, removeImage } = req.body;

    const category = await categoryService.getById(req.params.id);

    let image = category.image;

    // Replace image
    if (req.file) {
      image = buildRelativePaths([req.file])[0];
      if (category.image) deleteFile(category.image);
    }

    // Remove image
    if (removeImage && category.image) {
      deleteFile(category.image);
      image = null;
    }

    const updated = await categoryService.updateById(category.id, {
      title,
      typeIs,
      image,
    });

    res.status(200).json({
      success: true,
      message: 'Category updated successfully',
      data: updated,
    });
  }),

  // ✅ Get by ID
  getById: asyncHandler(async (req, res) => {
    const result = await categoryService.getById(req.params.id, req);

    res.status(200).json({
      success: true,
      data: result,
    });
  }),

  // ✅ List
  list: asyncHandler(async (req, res) => {
    const result = await categoryService.list(req);

    res.status(200).json({
      success: true,
      data: result.data,
      meta: result.meta,
    });
  }),

  // ✅ Delete
  delete: asyncHandler(async (req, res) => {
    const deleted = await categoryService.delete(req.params.id);

    if (deleted.image) {
      deleteFile(deleted.image);
    }

    res.status(200).json({
      success: true,
      message: 'Category deleted successfully',
    });
  }),
};
