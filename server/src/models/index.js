// src/models/index.js
import logger from '#config/logger.js';
import { sequelize } from '#config/database.js';

// Import all models
import About from './About.js';
import Certification from './Certification.js';
import FAQ from './FAQ.js';
import Location from './Location.js';
import Partner from './Partner.js';
import Service from './Service.js';
import Testimonial from './Testimonial.js';
import Blog from './Blog.js';
import Contact from './Contact.js';
import Gallery from './Gallery.js';
import Link from './Link.js';
import Project from './Project.js';
import Term from './Term.js';

/**
 * ========================
 * Database Sync Function
 * ========================
 **/
export const syncDB = async () => {
  try {
    await sequelize.authenticate();
    logger.info('🔐 Database connection established successfully.');

    await About.sync({ alter: false });
    logger.info('📄 About table synced successfully!');

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
  About,
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
