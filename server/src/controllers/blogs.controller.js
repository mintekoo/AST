import { blogService } from '#services/blogs.service.js';
import { asyncHandler } from '#errors/errorHandler.js';
import { deleteFile } from '#utils/deleteFile.js';
import { createMulter } from '#utils/multer.js';

// Multer config → blogs
const { upload: documentUpload, buildRelativePaths } = createMulter(['blogs']);

export const singleDocumentUpload = documentUpload;

export const blogController = {
  // ✅ Create blog
  create: asyncHandler(async (req, res) => {
    const { title, description } = req.body;

    const image = req.file ? buildRelativePaths([req.file])[0] : null;

    const blog = await blogService.create({
      title,
      description,
      image,
    });

    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      data: blog,
    });
  }),

  // ✅ Update blog by ID
  update: asyncHandler(async (req, res) => {
    const { title, description, removeImage } = req.body;

    const blog = await blogService.getById(req.params.id);

    let image = blog.image;

    // Replace image
    if (req.file) {
      image = buildRelativePaths([req.file])[0];
      if (blog.image) deleteFile(blog.image);
    }

    // Remove image manually
    if (removeImage && blog.image) {
      deleteFile(blog.image);
      image = null;
    }

    const updated = await blogService.updateById(blog.id, {
      title,
      description,
      image,
    });

    res.status(200).json({
      success: true,
      message: 'Blog updated successfully',
      data: updated,
    });
  }),

  // ✅ Get single blog
  getById: asyncHandler(async (req, res) => {
    const blog = await blogService.getById(req.params.id);

    res.status(200).json({
      success: true,
      data: blog,
    });
  }),

  // ✅ List all blogs
  list: asyncHandler(async (req, res) => {
    const result = await blogService.list(req);

    res.status(200).json({
      success: true,
      data: result.data,
      meta: result.meta,
    });
  }),

  // ✅ Delete blog
  delete: asyncHandler(async (req, res) => {
    const deleted = await blogService.delete(req.params.id);

    if (deleted.image) {
      deleteFile(deleted.image);
    }

    res.status(200).json({
      success: true,
      message: 'Blog deleted successfully',
    });
  }),
};
