const db = require("../db/querries.js")
const { body, validationResult } = require('express-validator')

const alphError = "must only contain letters"
const lenError = "must be between 3 and 15 characters"
const passError = "must be longer than 3 characters"

const validateSignup = [
    body("username")
        .trim()
        .isAlpha().withMessage(`username ${alphError}`)
        .isLength({min: 3, max: 15}).withMessage(`username ${lenError}`),
    body("first_name")
        .trim()
        .isAlpha().withMessage(`first name ${alphError}`)
        .isLength({min: 3, max: 15}).withMessage(`first name ${lenError}`),
    body("last_name")
        .trim()
        .isAlpha().withMessage(`last name ${alphError}`)
        .isLength({min: 3, max: 15}).withMessage(`last name ${lenError}`),
    body("password")
        .trim()
        .isLength({min: 3}).withMessage(`password ${passError}`),
    body("conpassword")
        .trim()
        .custom((value, {req}) => {
            return value === req.body.password
        }).withMessage("confirm password must match the password")
]

async function renderIndex(req, res) {
    const posts = await db.getPosts()
    console.log(posts)
    res.render('index', { user: req.user, posts: posts })
}

async function renderSignup(req, res) {
    res.render('sign-up', { errors: null })
}

async function renderLogin(req, res) {
    res.render('log-in')
}

async function renderJoin(req, res) {
    res.render('join')
}

async function joinClub(req, res) {
    if (req.body.code == "magic bullet") {
        await db.changeMembership(req.user.id, "member")
        res.redirect('/')
    }
}

const signUp = [
    validateSignup,
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).render('sign-up', { errors: errors.array() })
        }

        const data = req.body
        await db.createUser(data.username, data.first_name, data.last_name, data.password)
        res.redirect('/')
    }
]

module.exports = { renderIndex, renderSignup, renderLogin, signUp, renderJoin, joinClub }
