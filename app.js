const express = require('express')
const path = require('node:path')
const app = express()
const indexRouter = require("./routers/indexRouter.js")

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, views))

app.use(express.urlencoded({ extended: true }))

app.use('/', indexRouter)

app.listen(3000, () => console.log("listening..."))
