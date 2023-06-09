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
    // console.log(email);
    try {
        const instructorClasses = await Classes.find({ instructorEmail: email }).toArray()
        // console.log({instructorClasses});
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
        feedback,
        enrolledStudents
    } = req.body

    const classesInfo = {
        className,
        classImg,
        instructorName,
        instructorEmail,
        availableSeats: parseInt(availableSeats),
        price: parseFloat(price),
        status,
        feedback,
        enrolledStudents: parseInt(enrolledStudents)
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

// update classes
const updateInstructorClasses = async (req, res, next) => {
    const { className,
        classImg,
        availableSeats,
        price,
        classId,
    } = req.body

    const classesInfo = {
        className,
        classImg,
        classId,
        availableSeats: parseInt(availableSeats),
        price: parseFloat(price),

    }
    try {

        const updateInfo = await Classes.updateOne({ _id: new ObjectId(classId) }, { $set: classesInfo })
        res.status(200).json(classesInfo)
    } catch (error) {
        res.status(500).json({
            message: error.message,
            error
        })
    }

}

// delete classes
const deleteInstructorClasses = async (req, res, next) => {
    const { classId } = req.params
    console.log({ classId });
    try {
        const deleteInfo = await Classes.deleteOne({ _id: new ObjectId(classId) })
        res.status(200).json(deleteInfo)
    } catch (error) {
        res.status(500).json({
            message: error.message,
            error
        })
    }

}

module.exports = {
    getAllClasses,
    addClasses, getInstructorClasses,
    updateInstructorClasses,
    deleteInstructorClasses
}