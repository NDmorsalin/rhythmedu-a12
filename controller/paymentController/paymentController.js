const { ObjectId } = require("mongodb");
const { StudentsSelectedClass } = require("../../Models/Students/StudentsSelectedClass");
const { EnrolledClasses } = require("../../Models/Students/enrolledClasses");
const { Classes } = require("../../Models/ClassesModels/ClassesModels");
const { User } = require("../../Models/userModels/UserModels");

// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


const paymentController = async (req, res, next) => {
  const { price,
    classId, } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseFloat(price) * 100,
      currency: "usd",
      payment_method_types: ["card"],
      metadata: { integration_check: "accept_a_payment" },
    });
    res.json({ client_secret: paymentIntent.client_secret });
  } catch (error) {
    res.json({ error });
  }
};
const paymentSuccessful = async (req, res, next) => {
  const {
    className,
    classImg,
    instructorName,
    instructorEmail,
    price,
    studentId,
    classId,
    transactionId,
    paymentStatus,
    paymentDate } = req.body
  const paidClassInfo = {
    className,
    classImg,
    instructorName,
    instructorEmail,
    price,
    studentId,
    classId,
    transactionId,
    paymentStatus,
    paymentDate
  }
  try {

    // delete selected class
    const deleteSelectedClass = await StudentsSelectedClass.deleteOne({ classId })
    // save paid class 
    const enrolledClass = await EnrolledClasses.insertOne(paidClassInfo)
    // reduce instructor class Available seat
    // Specify the update operation
    const update = { $inc: { availableSeats: -1, enrolledStudents: 1 } };

    const reduceAvailableSeat = await Classes.updateOne({ _id: new ObjectId(classId) }, update)
    // instructor class add enrolled student

    const findInstructor = await User.updateOne({ email: instructorEmail }, { $push: { enrolledStudents: studentId } })
    // console.log({ findInstructor });

    // console.log({ enrolledClass, deleteSelectedClass ,reduceAvailableSeat});
    res.status(200).json(paidClassInfo)
  } catch (error) {
    console.log(error);
    res.status(500).json({ error })
  }
}
module.exports = {
  paymentController,
  paymentSuccessful
};
