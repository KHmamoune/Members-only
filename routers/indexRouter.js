const { Router } = require('express')
const indexRouter = Router()
const { renderIndex } = require('../controllers/indexController.js')

indexRouter.get('/', renderIndex)

module.exports = indexRouter
