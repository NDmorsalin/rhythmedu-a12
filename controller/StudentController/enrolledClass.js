const { EnrolledClasses } = require("../../Models/Students/enrolledClasses")

const getEnrolledClasses = async (req, res, next) => {
    const studentid = req.headers?.studentid
    const enrolledClasses = await EnrolledClasses.find({ studentId: studentid }).sort({ paymentDate: -1 }).toArray()
    // console.log(enrolledClasses);
    res.json(enrolledClasses)

}

module.exports = {
    getEnrolledClasses
}