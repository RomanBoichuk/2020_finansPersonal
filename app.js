const express = require('express');
var bodyParser = require('body-parser')
const app = express()
const documentController = require('./controllers/document-controller');
const fs = require('fs');

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));


app.set('view engine', 'pug');


app.get("/", documentController.maintable)
app.get("/profit-table", documentController.profittable)
app.get("/expense-table", documentController.expensetable)
app.post("/profit-table", documentController.createProfit)
app.post("/expense-table", documentController.createExpense)



app.listen(3002)
