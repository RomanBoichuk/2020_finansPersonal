const fs = require('fs');


exports.maintable = function (req, res) {
  res.render("main")
}

exports.profittable = function (req, res) {
  res.render("profit-table")
}

exports.expensetable = function (req, res) {
  res.render("expense-table")
}
