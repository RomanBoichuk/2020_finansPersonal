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
  var fileProfitName = moment().format("YYYY-MM-DD")+".json"
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
    var fileExpenseName = moment().format("YYYY-MM-DD") + "." + "expense" + "." + "json"
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

exports.calendartable = function (req, res) {
  res.render("calendar")
}

exports.showprofittable = function (req, res) {
  var datepicker = req.body.date + "." + "json"
  var datepickerFile=[]
  console.log(datepicker);
  try{
  if (fs.existsSync(datepicker)){
    datepickerFile = fs.readFileSync(datepicker, 'utf-8')
    datepickerFile = JSON.parse(datepickerFile)
    }
  } catch(err) {
    console.error(err)
  }
  console.log("$$$$$$$$$$$");
  console.log(datepickerFile);
  console.log("--------------");
  res.render("showprofit",{
    profit:datepickerFile,
    date:req.body.date
  })
}
