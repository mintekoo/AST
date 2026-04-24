// src/routes/mains.routes.js
import express from 'express';

/* =========================
   CORE ROUTES
========================= */
import authsRoutes from './auths.routes.js';

/* =========================
   CONTENT / CMS ROUTES
========================= */
import aboutsRouter from './abouts.routes.js';
import blogsRouter from './blogs.routes.js';
import certificationsRouter from './certifications.routes.js';
import contactsRouter from './contacts.routes.js';
import faqsRouter from './faqs.routes.js';
import linksRouter from './links.routes.js';
import locationsRouter from './locations.routes.js';
import partnersRouter from './partners.routes.js';
import projectsRouter from './projects.routes.js';
import servicesRouter from './services.routes.js';
import termsRouter from './terms.routes.js';
import testimonialsRouter from './testimonials.routes.js';
import galleriesRouter from './galleries.routes.js';

const router = express.Router();

/* =========================
   HEALTH CHECK
========================= */
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

/* =========================
   AUTH
========================= */
router.use('/auths', authsRoutes);

/* =========================
   CMS / CONTENT MODULES
========================= */
router.use('/abouts', aboutsRouter);
router.use('/blogs', blogsRouter);
router.use('/certifications', certificationsRouter);
router.use('/contacts', contactsRouter);
router.use('/faqs', faqsRouter);
router.use('/galleries', galleriesRouter);
router.use('/locations', locationsRouter);
router.use('/partners', partnersRouter);
router.use('/projects', projectsRouter);
router.use('/services', servicesRouter);
router.use('/socials', linksRouter);
router.use('/terms', termsRouter);
router.use('/testimonials', testimonialsRouter);

export default router;
