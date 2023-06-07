const express = require('express');
const {
  createToken
} = require('../controller/tokenController');
const verifyToken = require('../Middleware/verifyJwt.js');
const { addUser, getAllUsers } = require('../controller/userController/userController');

const router = express.Router();

// ! Delete it later
router.get('/', (req, res) => {
  res.send('Hello World!');
}
);


// Users routes
router.route('/users').get(getAllUsers).post(addUser)


// create jwt
router.route('/token').post(createToken)

module.exports = router;