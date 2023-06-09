const { ObjectId } = require("mongodb");
const {
    User
} = require("../../Models/userModels/UserModels");

//get all User
const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({}).toArray()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({
            message: error.message,
            error
        })
    }
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
const updateRole = async (req, res, next) => {
    const { id } = req.params
    const { role } = req.body
    // console.log({ id, role });
    try {
        const updatedInfo = await User.findOneAndUpdate({ _id:new ObjectId(id) }, { $set: { role } })
        res.status(200).json(updatedInfo)
    } catch (error) {
        res.status(500).json({
            message: error.message,
            error
        })
    }
}


module.exports = {
    getAllUsers,
    addUser, updateRole
}