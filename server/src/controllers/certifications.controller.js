import { certificationService } from '#services/certifications.service.js';
import { asyncHandler } from '#errors/errorHandler.js';
import { deleteFile } from '#utils/deleteFile.js';
import { createMulter } from '#utils/multer.js';

// Multer config → certifications
const { upload, buildRelativePaths } = createMulter(['certifications']);

export const singleCertificationUpload = upload;

export const certificationController = {
  // ✅ Create certification
  create: asyncHandler(async (req, res) => {
    const { title, issuingOrganization, issueDate } = req.body;

    const image = req.file ? buildRelativePaths([req.file])[0] : null;

    const certification = await certificationService.create({
      title,
      issuingOrganization,
      issueDate,
      image,
    });

    res.status(201).json({
      success: true,
      message: 'Certification created successfully',
      data: certification,
    });
  }),

  // ✅ Update certification
  update: asyncHandler(async (req, res) => {
    const { title, issuingOrganization, issueDate, removeImage } = req.body;

    const certification = await certificationService.getById(req.params.id);

    let image = certification.image;

    // replace image
    if (req.file) {
      image = buildRelativePaths([req.file])[0];
      if (certification.image) deleteFile(certification.image);
    }

    // remove image
    if (removeImage && certification.image) {
      deleteFile(certification.image);
      image = null;
    }

    const updated = await certificationService.updateById(certification.id, {
      title,
      issuingOrganization,
      issueDate,
      image,
    });

    res.status(200).json({
      success: true,
      message: 'Certification updated successfully',
      data: updated,
    });
  }),

  // ✅ Get one
  getById: asyncHandler(async (req, res) => {
    const certification = await certificationService.getById(req.params.id);

    res.status(200).json({
      success: true,
      data: certification,
    });
  }),

  // ✅ List all
  list: asyncHandler(async (req, res) => {
    const result = await certificationService.list(req);

    res.status(200).json({
      success: true,
      data: result.data,
      meta: result.meta,
    });
  }),

  // ✅ Delete
  delete: asyncHandler(async (req, res) => {
    const deleted = await certificationService.delete(req.params.id);

    if (deleted.image) {
      deleteFile(deleted.image);
    }

    res.status(200).json({
      success: true,
      message: 'Certification deleted successfully',
    });
  }),
};
