const connectDB = require('../src/config/database');
const User = require('../src/models/user');
const bcrypt = require('bcrypt');

const createUser = async () => {
  try {
    await connectDB();

    const hashedPassword = await bcrypt.hash('12345678', 10);

    const user = new User({
      nombre: 'user',
      email: 'user@admin.com',
      password: hashedPassword,
      role: 'usuario'
    });

    await user.save();
    console.log('user created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

createUser();
