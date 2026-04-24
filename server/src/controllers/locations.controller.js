import {
  createLocation,
  getLocationById,
  listLocations,
  updateLocationById,
  deleteLocationById,
} from '#services/locations.service.js';
import { asyncHandler } from '#errors/errorHandler.js';

/* =========================
   CREATE
========================= */
export const createLocationController = asyncHandler(async (req, res) => {
  const location = await createLocation(req.body);

  res.status(201).json({
    success: true,
    message: 'Location created successfully',
    data: location,
  });
});

/* =========================
   GET BY ID
========================= */
export const getLocationByIdController = asyncHandler(async (req, res) => {
  const location = await getLocationById(req.params.id);

  res.status(200).json({
    success: true,
    data: location,
  });
});

/* =========================
   LIST
========================= */
export const listLocationsController = asyncHandler(async (req, res) => {
  const result = await listLocations(req);

  res.status(200).json({
    success: true,
    data: result.data,
    meta: result.meta,
  });
});

/* =========================
   UPDATE
========================= */
export const updateLocationController = asyncHandler(async (req, res) => {
  const updated = await updateLocationById(req.params.id, req.body);

  res.status(200).json({
    success: true,
    message: 'Location updated successfully',
    data: updated,
  });
});

/* =========================
   DELETE
========================= */
export const deleteLocationController = asyncHandler(async (req, res) => {
  await deleteLocationById(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Location deleted successfully',
  });
});
