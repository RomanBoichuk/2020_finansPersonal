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
