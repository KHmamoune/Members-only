const { Router } = require('express')
const indexRouter = Router()
const { renderIndex, renderSignup, signUp, renderLogin, renderJoin, joinClub } = require('../controllers/indexController.js')

indexRouter.get('/', renderIndex)
indexRouter.get('/sign-up', renderSignup)
indexRouter.get('/log-in', renderLogin)
indexRouter.get('/join', renderJoin)
indexRouter.post('/sign-up', signUp)
indexRouter.post('/join', joinClub)

module.exports = indexRouter
