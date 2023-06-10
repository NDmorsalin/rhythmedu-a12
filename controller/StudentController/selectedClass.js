const { ObjectId } = require('mongodb')
const { Classes } = require('../../Models/ClassesModels/ClassesModels')
const { StudentsSelectedClass } = require('../../Models/Students/StudentsSelectedClass')

const selectedClassSave = async (req, res, next) => {
    const { studentId, classId } = req.body
    try {

        const selectedClass = await Classes.findOne({ _id: new ObjectId(classId) })
        selectedClass.studentId = studentId

        const selectedSaveInfo  = await StudentsSelectedClass.insertOne(selectedClass)

        res.status(200).json(selectedSaveInfo)

    } catch (error) {

        res.status(500).json({
            message: error.message,
            error
        })
    }
}

module.exports = {
    selectedClassSave
}