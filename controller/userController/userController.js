const { ObjectId } = require("mongodb");
const {
    User
} = require("../../Models/userModels/UserModels");

//get all User
const getAllUsers = async (req, res, next) => {

}
//add  User
const addUser = async (req, res, next) => {
    const { email, name, photoUrl, role } = req.body
    
    const userInfo = { name, email, role: role || 'student', photoUrl: photoUrl || '' }
   
    try {
        const alreadyAdded = await User.findOne({ email })

        if (alreadyAdded) {
         
            res.status(200).json(alreadyAdded)
            return
        }
        const insertInfo = await User.insertOne(userInfo)
   
        res.status(200).json(userInfo)
    } catch (error) {
        res.status(500).json({
            message: error.message,
            error
        })
    }

}


module.exports = {
    getAllUsers,
    addUser
}