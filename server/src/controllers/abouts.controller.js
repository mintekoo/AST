import { aboutService } from '#services/abouts.service.js';
import { asyncHandler } from '#errors/errorHandler.js';
import { createMulter } from '#utils/multer.js';
import { deleteFile } from '#utils/deleteFile.js';

const { upload: singleUpload, buildRelativePaths: buildSinglePaths } =
  createMulter(['abouts']);

export const aboutController = {
  // ✅ Create Single about
  create: asyncHandler(async (req, res) => {
    const { title, description, vision, mission, values } = req.body;

    const image = req.file ? buildSinglePaths([req.file])[0] : null;

    const about = await aboutService.create({
      title,
      description,
      vision,
      mission,
      values,
      image,
    });

    res.status(201).json({
      success: true,
      message: 'about created successfully',
      data: about,
    });
  }),

  // ✅ Get all abouts for logged-in user
  getUserabouts: asyncHandler(async (req, res) => {
    const result = await aboutService.getByUser(req.user.id, req);

    res.status(200).json({
      success: true,
      data: result.data,
      meta: result.meta,
    });
  }),

  // ✅ Get single about by ID
  getById: asyncHandler(async (req, res) => {
    const about = await aboutService.getById(req.params.id);

    res.status(200).json({
      success: true,
      data: about,
    });
  }),

  // ✅ List abouts (admin/pagination)
  list: asyncHandler(async (req, res) => {
    const result = await aboutService.listabouts(req);

    res.status(200).json({
      success: true,
      data: result.data,
      meta: result.meta,
    });
  }),

  // ✅ Update about
  update: asyncHandler(async (req, res) => {
    const { title, description, vision, mission, values, removeImage } =
      req.body;

    const about = await aboutService.getById(req.params.id);

    let image = about.image;

    // Replace image if new one uploaded
    if (req.file) {
      if (about.image) {
        deleteFile(about.image);
      }
      image = buildSinglePaths([req.file])[0];
    }

    // Remove image if requested
    if (removeImage === 'true' && !req.file) {
      if (about.image) {
        deleteFile(about.image);
      }
      image = null;
    }

    const updated = await aboutService.update(req.params.id, {
      title,
      description,
      vision,
      mission,
      values,
      image,
    });

    res.status(200).json({
      success: true,
      message: 'about updated successfully',
      data: updated,
    });
  }),

  // ✅ Delete about
  delete: asyncHandler(async (req, res) => {
    const deleted = await aboutService.delete(req.params.id);

    if (deleted.image) {
      deleteFile(deleted.image);
    }

    res.status(200).json({
      success: true,
      message: 'about deleted successfully',
    });
  }),
};

export const singleaboutUpload = singleUpload.single('image');
