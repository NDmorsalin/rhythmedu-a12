const {
  database
} = require("../../db/db")


module.exports = {
  Classes: database.collection("classes")
}
