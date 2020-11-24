var moment = require('moment');
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

exports.createProfit = function (req, res){
  var fileProfitName = moment().format("DD-MM-YYYY")+".json"
  var fileProfit = []
  try {
    if (fs.existsSync(fileProfitName)) {
      fileProfit=fs.readFileSync(fileProfitName, 'utf-8')
      fileProfit=JSON.parse(fileProfit)
    }
  } catch(err) {
    console.error(err)
  }
  fileProfit.push(req.body)
  fs.writeFileSync(fileProfitName, JSON.stringify(fileProfit))

  res.redirect("/")
}

exports.createExpense = function (req, res) {
    var fileExpenseName = moment().format("DD-MM-YYYY") + "." + "expense" + "." + "json"
    var fileExpense = []
    try {
      if (fs.existsSync(fileExpenseName)) {
        fileExpense=fs.readFileSync(fileExpenseName, 'utf-8')
        fileExpense=JSON.parse(fileExpense)
      }
    } catch(err) {
      console.error(err)
    }
    fileExpense.push(req.body)
    fs.writeFileSync(fileExpenseName, JSON.stringify(fileExpense))

    res.redirect("/")
}
