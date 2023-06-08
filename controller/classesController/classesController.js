const { ObjectId } = require("mongodb");
const {
    Classes
} = require("../../Models/ClassesModels/ClassesModels");

//get all Classes
const getAllClasses = async (req, res, next) => {

}

//add  Classes
const addClasses = async (req, res, next) => {
    const {className,
        classImg,
        instructorName,
        instructorEmail,
        availableSeats,
        price,
        status,
        feedback} = req.body
        
    const classesInfo = { className,
        classImg,
        instructorName,
        instructorEmail,
        availableSeats,
        price,
        status,
        feedback}
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
    addClasses
}