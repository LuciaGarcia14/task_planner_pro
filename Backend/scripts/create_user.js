const connectDB = require('../src/config/database');
const User = require('../src/models/user');
const bcrypt = require('bcrypt');

const createAdmin = async () => {
  try {
    await connectDB();

    const hashedPassword = await bcrypt.hash('admin123', 10);

    const adminUser = new User({
      nombre: 'admin',
      email: 'admin@admin.com',
      password: hashedPassword,
      role: 'admin'
    });

    await adminUser.save();
    console.log('✅ Admin user created successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();
