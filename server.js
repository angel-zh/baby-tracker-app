////////////////////
//  Dependencies  //
////////////////////
require("dotenv").config() // make env variables available
const express = require("express")
const middleware = require('./utils/middleware')
const BabyRouter = require('./controllers/baby')
const UserRouter = require('./controllers/user')
const DiaperRouter = require('./controllers/diaper')
const FeedingRouter = require('./controllers/feeding')
const SleepRouter = require('./controllers/sleep')

// const User = require("./models/user")
// SEE MORE DEPENDENCIES IN ./utils/middleware.js
// user and resource routes linked in ./utils/middleware.js

//////////////////////////////
// Middleware + App Object  //
//////////////////////////////
const app = require("liquid-express-views")(express())

middleware(app)

////////////////////
//    Routes      //
////////////////////
app.get('/', (req, res) => {
    const { username, userId, loggedIn } = req.session
	res.render('index.liquid', { loggedIn, username, userId })
})

app.use('/auth', UserRouter)
app.use('/babies', BabyRouter)
app.use('/diapers', DiaperRouter)
app.use('/feedings', FeedingRouter)
app.use('/sleep', SleepRouter)


app.get('/error', (req, res) => {
	const error = req.query.error || 'This Page Does Not Exist'
    const { username, loggedIn, userId } = req.session
	res.render('error.liquid', { error, username, loggedIn, userId })
})

// if page is not found, send to error page
app.all('*', (req, res) => {
	res.redirect('/error')
})



//////////////////////////////
//      App Listener        //
//////////////////////////////
app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
})