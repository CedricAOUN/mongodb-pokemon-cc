const bcrypt = require('bcrypt');
const User = require('../models/User');


const createFirstUser = async () => {
  const existingUser = await User.findOne({ username: 'pikachu' });
  if (existingUser) {
    console.log('First user already exists:', existingUser);
    return;
  }
  const hash = await bcrypt.hash('pikachu', 10);
  try {
    const user = await User.create({ username: 'pikachu', password: hash });
    console.log('First user created:', user);
  } catch (error) {
    console.error('Error creating first user:', error);
  }
};

module.exports = {
  createFirstUser
};