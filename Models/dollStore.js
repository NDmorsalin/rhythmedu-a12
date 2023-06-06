const {
  database
} = require("../db/db")


module.exports = {
    DollStore:database.collection("dollStore")
}