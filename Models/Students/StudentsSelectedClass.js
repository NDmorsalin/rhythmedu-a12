const {
    database
  } = require("../../db/db")
  
  
  module.exports = {
    StudentsSelectedClass: database.collection("studentsSelectedClass")
  }
  