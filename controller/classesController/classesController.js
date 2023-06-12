const { ObjectId } = require("mongodb");
const {
    Classes
} = require("../../Models/ClassesModels/ClassesModels");
const { StudentsSelectedClass } = require("../../Models/Students/StudentsSelectedClass");
const { EnrolledClasses } = require("../../Models/Students/enrolledClasses");
const { User } = require("../../Models/userModels/UserModels");

//get all Classes
const getAllClasses = async (req, res, next) => {
    const studentId = req.headers.studentid


    try {
        if (studentId) {

            const allClasses = await Classes.find({ status: "approved" }).toArray()
            const selectedClassOfThisStudent = await StudentsSelectedClass.find({ studentId }).toArray()
            const paidClasses = await EnrolledClasses.find({ studentId }).toArray()
            const allClassesWithStudentId = allClasses.map((singleClass) => {
                const isThisClassSelected = selectedClassOfThisStudent.find((selectedClass) => selectedClass.classId === singleClass._id.toString())
                const isPaidClass = paidClasses.find((paidClass) => paidClass.classId === singleClass._id.toString())

                if (isThisClassSelected) {
                    return {
                        ...singleClass,

                        isThisClassSelected: true
                    }
                }

                if (isPaidClass) {
                    return {
                        ...singleClass,
                        isPaid: true,
                    }
                }

                return {
                    ...singleClass,
                }

            })


            res.status(201).json(allClassesWithStudentId)
        } else {
            const allClasses = await Classes.find({ status: "approved" }).toArray()
            res.status(200).json(allClasses)
        }
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


// update Status
const updateStatus = async (req, res, next) => {
    const { status } = req.body
    const { id } = req.params
    console.log({ id, status });
    try {
        const updateInfo = await Classes.updateOne({ _id: new ObjectId(id) }, { $set: { status } })
        res.status(200).json(updateInfo)
    } catch (error) {
        res.status(500).json({
            message: error.message,
            error
        })

    }
}

// send feedback
const sendFeedback = async (req, res, next) => {
    const { feedback } = req.body
    const { id } = req.params
    console.log({ id, feedback });
    try {
        const updateInfo = await Classes.updateOne({ _id: new ObjectId(id) }, { $set: { feedback } })
        res.status(200).json(updateInfo)
    } catch (error) {
        res.status(500).json({
            message: error.message,
            error
        })

    }
}

// single instructor classes
const singleInstructorClasses = async (req, res, next) => {
    const studentId = req.headers.studentid
    const instructorId = req.headers.instructorid
  

    try {
        const instructor = await User.findOne({ _id: new ObjectId(instructorId) })
        const instructorClasses = await Classes.find({ instructorEmail: instructor.email, status: "approved" }).toArray()

        if (studentId) {
            const selectedClassOfThisStudent = await StudentsSelectedClass.find({ studentId }).toArray()

            const paidClasses = await EnrolledClasses.find({ studentId }).toArray()

            const instructorClassesWithStudentId = instructorClasses.map((singleClass) => {
                const isThisClassSelected = selectedClassOfThisStudent.find((selectedClass) => selectedClass.classId === singleClass._id.toString())
                const isPaidClass = paidClasses.find((paidClass) => paidClass.classId === singleClass._id.toString())

                if (isThisClassSelected) {
                    return {
                        ...singleClass,

                        isThisClassSelected: true
                    }
                }

                if (isPaidClass) {
                    return {
                        ...singleClass,
                        isPaid: true,
                    }
                }

                return {
                    ...singleClass,
                }

            })

            res.status(200).json({ instructor, instructorClasses: instructorClassesWithStudentId })
        } else {
            res.status(200).json({ instructor, instructorClasses })
        }
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
    deleteInstructorClasses,
    updateStatus,
    sendFeedback,
    singleInstructorClasses

}