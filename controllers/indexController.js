const db = require("../db/querries.js")

async function renderIndex(req, res) {
    console.log(req.user)
    res.render('index', { user: req.user })
}

async function renderSignup(req, res) {
    res.render('sign-up')
}

async function renderLogin(req, res) {
    res.render('log-in')
}

async function signUp(req, res) {
    const data = req.body
    await db.createUser(data.username, data.first_name, data.last_name, data.password)
    res.redirect('/')
}

module.exports = { renderIndex, renderSignup, renderLogin, signUp }
