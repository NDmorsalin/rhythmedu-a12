const {
    database
  } = require("../../db/db")
  
  
  module.exports = {
      User:database.collection("user")
  }