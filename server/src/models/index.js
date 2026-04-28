// src/models/index.js
import logger from '#config/logger.js';
import { sequelize } from '#config/database.js';

// Import all models
import Admin from './admin.model.js';
import About from './about.model.js';
import Category from './category.model.js';
import Certification from './certification.model.js';
import FAQ from './faq.model.js';
import Location from './location.model.js';
import Partner from './partner.model.js';
import Service from './service.model.js';
import Testimonial from './testimonial.model.js';
import Blog from './blog.model.js';
import Contact from './contact.model.js';
import Gallery from './gallery.model.js';
import Link from './link.model.js';
import Project from './project.model.js';
import Term from './term.model.js';

Category.hasMany(Project, {
  foreignKey: 'categoryId',
  as: 'projects',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE',
});

Project.belongsTo(Category, {
  foreignKey: 'categoryId',
  as: 'category',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE',
});

Category.hasMany(Blog, {
  foreignKey: 'categoryId',
  as: 'blogs',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE',
});

Blog.belongsTo(Category, {
  foreignKey: 'categoryId',
  as: 'category',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE',
});

/**
 * ========================
 * Database Sync Function
 * ========================
 **/
export const syncDB = async () => {
  try {
    await sequelize.authenticate();
    logger.info('🔐 Database connection established successfully.');

    await Admin.sync({ alter: false });
    logger.info('🛡️ Admin table synced successfully!');

    await About.sync({ alter: false });
    logger.info('📄 About table synced successfully!');

    await Category.sync({ alter: false });
    logger.info('🏷️ Category table synced successfully!');

    await Certification.sync({ alter: false });
    logger.info('🏆 Certification table synced successfully!');

    await FAQ.sync({ alter: false });
    logger.info('❓ FAQ table synced successfully!');

    await Location.sync({ alter: false });
    logger.info('📍 Location table synced successfully!');

    await Partner.sync({ alter: false });
    logger.info('🤝 Partner table synced successfully!');

    await Service.sync({ alter: false });
    logger.info('🛠️ Service table synced successfully!');

    await Testimonial.sync({ alter: false });
    logger.info('⭐ Testimonial table synced successfully!');

    await Blog.sync({ alter: false });
    logger.info('📰 Blog table synced successfully!');

    await Contact.sync({ alter: false });
    logger.info('📞 Contact table synced successfully!');

    await Gallery.sync({ alter: false });
    logger.info('🖼️ Gallery table synced successfully!');

    await Link.sync({ alter: false });
    logger.info('🔗 Link table synced successfully!');

    await Project.sync({ alter: false });
    logger.info('📁 Project table synced successfully!');

    await Term.sync({ alter: false });
    logger.info('📜 Term table synced successfully!');

    const totalTables = Object.keys(sequelize.models).length;

    logger.info(
      `🌟🚀✨ 💯 Database Sync Complete! 🎯 ${totalTables} Tables ✅ Synced Successfully! 🗃️📦✨💯`
    );
  } catch (error) {
    logger.error('❌ Error syncing database:', error);
    throw error;
  }
};

// Export sequelize + models
export {
  sequelize,
  Admin,
  About,
  Category,
  Certification,
  FAQ,
  Location,
  Partner,
  Service,
  Testimonial,
  Blog,
  Contact,
  Gallery,
  Link,
  Project,
  Term,
};
