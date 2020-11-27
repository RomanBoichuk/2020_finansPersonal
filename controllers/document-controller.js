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
  console.log(fileProfit);
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
  try{
  if (fs.existsSync(datepicker)){
    datepickerFile = fs.readFileSync(datepicker, 'utf-8')
    datepickerFile = JSON.parse(datepickerFile)
    }
  } catch(err) {
    console.error(err)
  }

  var priseSuma=0
  for (var i = 0; i < datepickerFile.length; i++ ) {
    var x
    x=(Number(datepickerFile[i].sum))
    priseSuma=priseSuma+x
  }

  res.render("showprofit",{
    profit:datepickerFile,
    date:req.body.date,
    priseSuma:priseSuma
  })
}


exports.showexpensetable = function (req, res) {
  var datepicker = req.body.date + "." + "expense" + "." + "json"
  var datepickerFile=[]
  try{
  if (fs.existsSync(datepicker)){
    datepickerFile = fs.readFileSync(datepicker, 'utf-8')
    datepickerFile = JSON.parse(datepickerFile)
    }
  } catch(err) {
    console.error(err)
  }

  var priseSuma=0
  for (var i = 0; i < datepickerFile.length; i++ ) {
    var x
    x=(Number(datepickerFile[i].prise))
    priseSuma=priseSuma+x
  }

  res.render("showexpense",{
    expense:datepickerFile,
    date:req.body.date,
    priseSuma:priseSuma
  })
}


exports.showprofitexpensetable = function (req, res){
  var datepickerProfit = req.body.date + "." + "json"
  var datepickerProfitFile=[]
  try{
  if (fs.existsSync(datepickerProfit)){
    datepickerProfitFile = fs.readFileSync(datepickerProfit, 'utf-8')
    datepickerProfitFile = JSON.parse(datepickerProfitFile)
    }
  } catch(err) {
    console.error(err)
  }

  var priseProfitSuma=0
  for (var i = 0; i < datepickerProfitFile.length; i++ ) {
    var x
    x=(Number(datepickerProfitFile[i].sum))
    priseProfitSuma=priseProfitSuma+x
  }

  var datepickerExpense = req.body.date + "." + "expense" + "." + "json"
  var datepickerExpenseFile=[]
  try{
  if (fs.existsSync(datepickerExpense)){
    datepickerExpenseFile = fs.readFileSync(datepickerExpense, 'utf-8')
    datepickerExpenseFile = JSON.parse(datepickerExpenseFile)
    }
  } catch(err) {
    console.error(err)
  }

  var priseExpenseSuma=0
  for (var i = 0; i < datepickerExpenseFile.length; i++ ) {
    var x
    x=(Number(datepickerExpenseFile[i].prise))
    priseExpenseSuma=priseExpenseSuma + x
  }
  var balansResult=priseProfitSuma-priseExpenseSuma

  res.render("show-profit-expense",{
    profit:datepickerProfitFile,
    expense:datepickerExpenseFile,
    balansResult:balansResult,
    date:req.body.date
  })
}
