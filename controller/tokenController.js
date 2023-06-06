require('dotenv').config();
const jwt = require('jsonwebtoken');

const createToken = async (req, res, next) => {
  const {
    email
  } = req.body;
  try {
    const token = jwt.sign({
      email
    }, process.env.JWT_SECRET, {
      expiresIn: '3d'
    });
    // Set the token as a signed cookie
    res.cookie('token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // 3 days
    });
    res.status(201).json({
      message: 'jwt ',
      token
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createToken,
}