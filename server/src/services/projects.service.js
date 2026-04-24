import { Project } from '#models/index.js';
import { AppError, ERR } from '#errors/errorHandler.js';
import { getPaginationParams, getPaginationMeta } from '#utils/pagination.js';

/* =========================
   CREATE
========================= */
export const createProject = async (data) => {
  return await Project.create(data);
};

/* =========================
   GET BY ID
========================= */
export const getProjectById = async (id) => {
  const project = await Project.findByPk(id);

  if (!project) {
    throw new AppError('Project not found', ERR.NOT_FOUND);
  }

  return project;
};

/* =========================
   LIST
========================= */
export const listProjects = async (req) => {
  const { page, limit, offset } = getPaginationParams(req);

  const { rows, count } = await Project.findAndCountAll({
    limit,
    offset,
    order: [['createdAt', 'DESC']],
  });

  return {
    data: rows,
    meta: getPaginationMeta(page, limit, count),
  };
};

/* =========================
   UPDATE
========================= */
export const updateProjectById = async (id, data) => {
  const project = await Project.findByPk(id);

  if (!project) {
    throw new AppError('Project not found', ERR.NOT_FOUND);
  }

  await project.update(data);
  return project;
};

/* =========================
   DELETE
========================= */
export const deleteProjectById = async (id) => {
  const project = await Project.findByPk(id);

  if (!project) {
    throw new AppError('Project not found', ERR.NOT_FOUND);
  }

  await project.destroy();
  return project;
};