const express = require('express');
const app = express()
const documentController = require('./controllers/document-controller');
const fs = require('fs');


app.set('view engine', 'pug');


app.get("/", documentController.maintable)
app.get("/profit-table",documentController.profittable)
app.get("/expense-table",documentController.expensetable)




app.listen(3002)
