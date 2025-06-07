const { Router } = require('express')
const indexRouter = Router()
const { renderIndex, renderSignup, signUp, renderLogin } = require('../controllers/indexController.js')

indexRouter.get('/', renderIndex)
indexRouter.get('/sign-up', renderSignup)
indexRouter.post('/sign-up', signUp)
indexRouter.get('/log-in', renderLogin)

module.exports = indexRouter
