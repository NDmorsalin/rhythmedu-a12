const { ObjectId } = require('mongodb')
const { Classes } = require('../../Models/ClassesModels/ClassesModels')
const { StudentsSelectedClass } = require('../../Models/Students/StudentsSelectedClass')
const { User } = require('../../Models/userModels/UserModels')

const selectedClassSave = async (req, res, next) => {
    const { studentId, classId } = req.body

    try {

        const selectedClass = await Classes.findOne({ _id: new ObjectId(classId) }, { projection: { _id: 0 } })
        selectedClass.studentId = studentId
        selectedClass.classId = classId

        const selectedSaveInfo = await StudentsSelectedClass.insertOne(selectedClass)

        res.status(200).json(selectedSaveInfo)

    } catch (error) {

        res.status(500).json({
            message: error.message,
            error
        })
    }
}

const getStudentSelectedClasses = async (req, res, next) => {
    const studentid = req.headers?.studentid
    const selectedClass = await StudentsSelectedClass.find({ studentId: studentid }).toArray()

    res.json(selectedClass)
}

const deleteSelectedClass = async (req, res, next) => {
    const deleteClassId = req.headers?.deleteclassid

    try {

        const deleteClass = await StudentsSelectedClass.deleteOne({ _id: new ObjectId(deleteClassId) })
        res.status(200).json(deleteClass)
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
            error
        })
    }

}
module.exports = {
    selectedClassSave, getStudentSelectedClasses,
    deleteSelectedClass
}