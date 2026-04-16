const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const private_key = require('../auth/private_key');

const userLogin = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      const message = "This user doesn't exist.";
      return res.status(404).json({ message });
    }
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
      const message = "Invalid password.";
      return res.status(401).json({ message });
    }
    const token = await jwt.sign({ id: user._id, uName: user.username }, private_key, { expiresIn: '2h' });
    const message = 'Login successful.';
    res.json({ message, data: user, token });
  } catch (error) {
    const message = "An error occurred while trying to log in.";
    res.status(500).json({ message, data: error });
  }
};

module.exports = {
  userLogin
};