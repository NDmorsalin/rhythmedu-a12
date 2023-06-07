const express = require('express');
const {
  createToken
} = require('../controller/tokenController');
const verifyToken = require('../Middleware/verifyJwt.js')

const router = express.Router();

// ! Delete it later
router.get('/', (req, res) => {
  res.send('Hello World!');
}
);


// Doll routes
// create jwt
router.route('/token').post(createToken)

module.exports = router;