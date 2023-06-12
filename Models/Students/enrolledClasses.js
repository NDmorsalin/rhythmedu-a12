const {
    database
  } = require("../../db/db")
  
  
  module.exports = {
    EnrolledClasses: database.collection("enrolledClasses")
  }
  