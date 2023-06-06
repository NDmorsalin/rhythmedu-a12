const jwt = require('jsonwebtoken');
require('dotenv').config();
const verifyToken = (req, res, next) => {
  // Get the token from the request cookies or headers
  const token = req.cookies.token || req.headers.authorization;
console.log({token});
  if (!token) {
    return res.status(401).json( {
      error: 'No token provided'
    });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).json( {
        error: 'Invalid token'
      });
    }

    // Attach the decoded token to the request object
    const {email} = decoded
    req.email = email;
    console.log({email: req.email,decoded});

    // Proceed to the next middleware or route handler
    next();
  });
};

module.exports = verifyToken;
