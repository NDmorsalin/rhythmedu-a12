const { ObjectId } = require("mongodb");
const {
  DollStore
} = require("../Models/dollStore.js");

//get all dolls
const getAllDolls = async (req, res, next) => {
  let query = {};
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 0;
  const nameRegex = new RegExp(req.query.search, 'i');
  const skip = (page - 1) * limit;
  let sort = {}
  if (req.query.sort === 'asc') {
    sort = { price: 1 }
  }
  if (req.query.sort === 'desc') {
    sort = { price: -1 }
  }
  console.log({ sort });

  if (nameRegex) {
    query = {
      name: nameRegex
    }
  }


  try {

    const totalDolls = await DollStore.countDocuments()
    // const dolls = await DollStore.find(query).limit(limit).skip(skip).sort(sort).collation({ numericOrdering: true }).toArray()
    const dolls = await DollStore.find(query).limit(limit).skip(skip).sort(sort).toArray()
    // console.log({ search:req.query.search });
    res.status(200).json({ dolls, totalDolls: req.query.search ? dolls.length : totalDolls })
  } catch (e) {
    console.log(e)
    res.status(500).json({
      error: e.message
    })
  }
}

// get doll by id
const getDollById = async (req, res) => {
  const id = req.params.id;
  try {
    const query = {
      _id: new ObjectId(id)
    }
    const doll = await DollStore.findOne(query)
    res.status(200).json(doll)

  } catch (e) {
    console.log(e)
    res.status(500).json({
      error: e.message
    })
  }
}

// add doll
const addDoll = async (req, res) => {
  console.log({loggedInUser:req.email});

  const dollData = req.body;
  try {
    /* code */
    const doll = await DollStore.insertOne({...dollData,price:parseInt(dollData.price),quantity:parseInt(dollData.quantity),rating:parseInt(dollData.rating)})

    res.status(201).json(doll)
  } catch (e) {
    console.log(e)
    res.status(500).json({
      error: e.message
    })
  }
}

// getMyDoll
const getMyDoll = async (req, res) => {
  console.log({loggedInUser:req.email});

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 0;
  const skip = (page - 1) * limit;
  const email = req.query.email;
  let sort = {}
  if (req.query.sort === 'asc') {
    sort = { price: 1 }
  }
  if (req.query.sort === 'desc') {
    sort = { price: -1 }
  }
  console.log({ sort });
  try {
    const totalDolls = await DollStore.countDocuments()
    // const dolls = await DollStore.find({ 'seller.sellerEmail': email }).limit(limit).skip(skip).sort(sort).collation({ numericOrdering: true }).toArray()
    const dolls = await DollStore.find({ 'seller.sellerEmail': email }).limit(limit).skip(skip).sort(sort).toArray()
    res.status(200).json({ dolls, totalDolls: email ? dolls.length : totalDolls })
  } catch (e) {
    console.log(e)
    res.status(500).json({
      error: e.message
    })
  }
}

// update doll
const updateDoll = async (req, res) => {
  const id = req.params.id;
  const dollData = req.body;
  // console.dir(req.cookies);
  console.log({loggedInUser:req.email});
  try {
    const query = {
      _id: new ObjectId(id)
    }

    const updatedDoll = await DollStore.updateOne(query, {
      $set: dollData
    }, {
      upsert: true
    })
    // console.log(updatedDoll);
    if (updatedDoll.acknowledged) {
      const updatedValue = await DollStore.findOne(query);
      res.status(200).json(updatedValue);
    } else {
      res.status(404).json({ message: "Doll not found" });
    }


  } catch (e) {
    console.log(e)
    res.status(500).json({
      error: e.message
    })
  }
}
// delete doll
const deleteDoll = async (req, res) => {
  const id = req.params.id;
  try {
    const query = {
      _id: new ObjectId(id)
    }
    const deletedDoll = await DollStore.findOneAndDelete(query)
    res.status(200).json(deletedDoll)

  } catch (e) {
    console.log(e)
    res.status(500).json({
      error: e.message
    })
  }
}



module.exports = {
  getAllDolls,
  getDollById, addDoll,
  getMyDoll,
  updateDoll,
  deleteDoll
}