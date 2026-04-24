import { adminService } from '#services/adminCRUD.js';
import { asyncHandler } from '#errors/errorHandler.js';

export const adminController = {
  // ✅ Create Admin
  create: asyncHandler(async (req, res) => {
    const admin = await adminService.createAdmin(req.body);

    const adminData = { ...admin.get() };
    delete adminData.password;

    res.status(201).json({
      success: true,
      message: 'Admin created successfully',
      data: adminData,
    });
  }),

  // ✅ Update Admin
  update: asyncHandler(async (req, res) => {
    const admin = await adminService.updateAdmin(req.params.id, req.body);

    const adminData = { ...admin.get() };
    delete adminData.password;

    res.status(200).json({
      success: true,
      message: 'Admin updated successfully',
      data: adminData,
    });
  }),

  // ✅ Get Admin by ID
  getById: asyncHandler(async (req, res) => {
    const admin = await adminService.getAdminById(req.params.id);
    res.status(200).json({
      success: true,
      data: admin,
    });
  }),

  list: asyncHandler(async (req, res) => {
    const result = await adminService.listAdmins(req);
    res.status(200).json({
      success: true,
      data: result.data,
      meta: result.meta,
    });
  }),

  // ✅ Delete Admin
  delete: asyncHandler(async (req, res) => {
    const result = await adminService.deleteAdmin(req.params.id);
    res.status(200).json({
      success: true,
      message: result.message,
    });
  }),
};
