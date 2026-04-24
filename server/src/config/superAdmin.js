// src/config/superAdmin.js
import logger from '#config/logger.js';
import { Admin } from '#models/index.js';
import { Op } from 'sequelize';

const createSuperAdmin = async () => {
  try {
    const superEmail = process.env.SUPERADMIN_EMAIL;
    const superPhone = process.env.SUPERADMIN_PHONE;
    const superPassword = process.env.SUPERADMIN_PASSWORD;
    const superName = process.env.SUPERADMIN_Full_NAME;

    // 0️⃣ Validate required env variables
    if (!superEmail || !superPhone) {
      throw new Error(
        'Super Admin email and phone are required. Check your environment variables.'
      );
    }

    // 3️⃣ Admin: CREATE or UPDATE
    const adminPayload = {
      fullName: superName,
      email: superEmail,
      phone: superPhone,
      password: superPassword,
    };

    // Check existing Admin by email or phone
    const existingAdmin = await Admin.findOne({
      where: {
        [Op.or]: [{ email: superEmail }, { phone: superPhone }],
      },
    });

    if (existingAdmin) {
      // Update only if values differ
      let needsUpdate = false;
      if (existingAdmin.email !== superEmail) {
        existingAdmin.email = superEmail;
        needsUpdate = true;
      }
      if (existingAdmin.phone !== superPhone) {
        existingAdmin.phone = superPhone;
        needsUpdate = true;
      }
      if (needsUpdate) {
        await existingAdmin.update(adminPayload);
        logger.info(`🔁 Super Admin updated: ${existingAdmin.email}`);
      } else {
        logger.info(
          `ℹ️ Super Admin exists and is up-to-date: ${existingAdmin.email}`
        );
      }
    } else {
      await Admin.create(adminPayload);
      logger.info('✅ Super Admin created');
    }
  } catch (error) {
    logger.error('❌ Error creating/updating Super Admin:', error);
  }
};

export default createSuperAdmin;
