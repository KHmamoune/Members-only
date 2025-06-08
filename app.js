const express = require('express')
const path = require('node:path')
const app = express()
const session = require("express-session");
const pgSession = require('connect-pg-simple')(session);
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs')
const pool = require("./db/pool.js")
require('dotenv').config()

const indexRouter = require("./routers/indexRouter.js")
const postRouter = require("./routers/postRouter.js")

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(session({
    store: new pgSession({
        pool : pool,
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }
}));
app.use(passport.session())

app.use(express.urlencoded({ extended: true }))

app.use('/', indexRouter)
app.use('/post', postRouter)

app.get("/log-out", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err)
        }
        res.redirect("/")
    })
})

app.post("/sign-up", async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
      req.body.username,
      hashedPassword,
    ]);
    res.redirect("/");
  } catch(err) {
    return next(err);
  }
});

app.post("/log-in", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
}))

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const {rows} = await pool.query("SELECT * FROM users WHERE username = $1", [username])
            const user = rows[0]

            if (!user) {
                return done(null, false, {message: "Incorrect username"})
            }
            if (!await bcrypt.compare(password, user.password)) {
                return done(null, false, {message: "Incorrect password"})
            }

            return done(null, user)
        } catch (err) {
            return done(err)
        }
    })
)

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    try {
        const {rows} = await pool.query("SELECT * FROM users WHERE id = $1", [id])
        const user = rows[0]

        done(null, user)
    } catch (err) {
        done(err)
    }
})

app.listen(3000, () => console.log("listening..."))
