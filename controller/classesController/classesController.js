const { ObjectId } = require("mongodb");
const {
    Classes
} = require("../../Models/ClassesModels/ClassesModels");

//get all Classes
const getAllClasses = async (req, res, next) => {
    try {
        const allClasses = await Classes.find({}).toArray()
        res.status(200).json(allClasses)
    } catch (error) {
        res.status(500).json({
            message: error.message,
            error
        })
    }
}

// get individual instructor classes
const getInstructorClasses = async (req, res, next) => {
    const email = req.email
    try {
        const instructorClasses = await Classes.find({ email }).toArray()
        res.status(200).json(instructorClasses)
    } catch (error) {
        res.status(500).json({
            message: error.message,
            error
        })
    }
}

//add  Classes
const addClasses = async (req, res, next) => {
    const { className,
        classImg,
        instructorName,
        instructorEmail,
        availableSeats,
        price,
        status,
        feedback } = req.body

    const classesInfo = {
        className,
        classImg,
        instructorName,
        instructorEmail,
        availableSeats,
        price,
        status,
        feedback
    }
    try {

        const insertInfo = await Classes.insertOne(classesInfo)
        res.status(200).json(classesInfo)
    } catch (error) {
        res.status(500).json({
            message: error.message,
            error
        })
    }

}

module.exports = {
    getAllClasses,
    addClasses, getInstructorClasses
}