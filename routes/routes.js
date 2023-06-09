const express = require('express');
const {
  createToken
} = require('../controller/tokenController');
const verifyToken = require('../Middleware/verifyJwt.js');
const { addUser, getAllUsers } = require('../controller/userController/userController');
const { getAllClasses, addClasses, getInstructorClasses, updateInstructorClasses } = require('../controller/classesController/classesController');
const verifyRole = require('../Middleware/verifyRole');

const router = express.Router();

// ! Delete it later
router.get('/', (req, res) => {
  res.send('Hello World!');
}
);


// Users routes
router.route('/users').get(getAllUsers).post(addUser)

// Users Classes
router.route('/classes').get(getAllClasses)
router.route('/myClasses')
  .get(verifyToken, verifyRole('instructor'), getInstructorClasses)
  .post(verifyToken, verifyRole('instructor'),  addClasses)
  .put(verifyToken, verifyRole('instructor'),  updateInstructorClasses)


// create jwt
router.route('/token').post(createToken)

module.exports = router;