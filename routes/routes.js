const express = require('express');
const {
  createToken
} = require('../controller/tokenController');
const verifyToken = require('../Middleware/verifyJwt.js')
const {
  getAllDolls,
  getDollById,
  addDoll,
  getMyDoll,
  deleteDoll,
  updateDoll
} = require('../controller/dollStoreController');
const router = express.Router();

// ! Delete it later
router.get('/', (req, res) => {
  res.send('Hello World!');
}
);


// Doll routes
router.route('/dolls').get(getAllDolls)
router.route('/doll/:id').get(getDollById)
router.route('/mydolls').get(verifyToken,getMyDoll).post(verifyToken,addDoll)
router.route('/mydolls/:id').delete(verifyToken,deleteDoll).put(verifyToken,updateDoll)

// create jwt
router.route('/token').post(createToken)

module.exports = router;