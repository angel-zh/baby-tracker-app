////////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////////
const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

////////////////////////////////////////////
// Create router
////////////////////////////////////////////
const router = express.Router()


// Routes

// GET to render the signup form
router.get('/signup', (req, res) => {
	res.render('auth/signup')
})

// POST to send the signup info
router.post('/signup', async (req, res) => {
	if (req.body.password === req.body.passwordCheck) {
		// set the password to hashed password
		req.body.password = await bcrypt.hash(
			req.body.password,
			await bcrypt.genSalt(10)
		)
		// create a new user
		User.create(req.body)
			// if created successfully redirect to login
			.then((user) => {
				res.redirect('/auth/login')
			})
			// if an error occurs, send err
			.catch((error) => {
				res.redirect(`/error?error=${error}`)
			})
	} else {
		res.redirect('/error?error=The%20passwords%20do%20not%20match.')
	}
})


// GET
// get to render the login form
router.get('/login', (req, res) => {
	res.render('auth/login')
})

// POST
// send the login info(and create a session)
router.post('/login', async (req, res) => {
	// console.log('request object', req)
	// get the data from the request body
	console.log('req.body', req.body);

	const { username, password } = req.body
	// then we search for the user
	User.findOne({ username: username })
		.then(async (user) => {
			// check if the user exists
			if (user) {
				// compare the password
				// bcrypt.compare evaluates to a truthy or a falsy value
				const result = await bcrypt.compare(password, user.password)

				if (result) {
					console.log('the user', user);

					// store some properties in the session
					req.session.username = username
					req.session.loggedIn = true
					req.session.userId = user.id

					// const { username, loggedIn, userId } = req.session
					console.log('this is req.session', req.session)
					// console.log('session user id', req.session.userId)
					res.redirect('/')
				} else {
					// send an error if the password doesnt match
					res.redirect('/error?error=username%20or%20password%20incorrect')
				}
			} else {
				// send an error if the user doesnt exist
				res.redirect('/error?error=That%20user%20does%20not%20exist')
			}
		})
		// catch any other errors that occur
		.catch((error) => {
			console.log('the error', error);

			res.redirect(`/error?error=${error}`)
		})
})

// GET
// SENDS to the logout page
router.get('/logout', (req, res) => {
	const username = req.session.username
	const loggedIn = req.session.loggedIn
	const userId = req.session.userId

	res.render('auth/logout', { username, loggedIn, userId })
})

// DELETE
// logout route -> destroy the session
router.delete('/logout', (req, res) => {
	req.session.destroy(err => {
		console.log('req.session after logout', req.session)
		console.log('err on logout?', err)
		res.redirect('/')
	})
})

// Export the Router
module.exports = router
