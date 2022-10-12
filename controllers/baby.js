// Import Dependencies
const express = require('express')
const Baby = require('../models/baby')
const User = require('../models/user')

// Create router
const router = express.Router()

// Router Middleware
// Authorization middleware
// If you have some resources that should be accessible to everyone regardless of loggedIn status, this middleware can be moved, commented out, or deleted. 
// router.use((req, res, next) => {
// 	// checking the loggedIn boolean of our session
// 	if (req.session.loggedIn) {
// 		// if they're logged in, go to the next thing(thats the controller)
// 		next()
// 	} else {
// 		// if they're not logged in, send them to the login page
// 		res.redirect('/auth/login')
// 	}
// })

// Routes
// GET all babies
// Index Route
router.get('/', (req, res) => {
    Baby.find({})
		.populate('diapers.baby', 'firstName')
		.populate('feedings.baby', 'firstName')
		.populate('sleep.baby', 'firstName')
        .then(babies => {
            const username = req.session.username
            const loggedIn = req.session.loggedIn
            const userId = req.session.userId
            // here, we're going to render page but we can also send data that we got from the database to that liquid page for rendering, this data is an object that contains all babies
            res.render('babies/index', { babies, username, loggedIn, userId })
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})


// GET - Render form to register a new baby
router.get('/new', (req, res) => {
	const username = req.session.username
	const loggedIn = req.session.loggedIn
	const userId = req.session.userId
	res.render('babies/new', { username, loggedIn, userId })
})

// GET for user's babies
router.get('/mine', (req, res) => {
    // find babies by owner and display them
    Baby.find({ owner: req.session.userId })
        .then(babies => {
            const username = req.session.username
            const loggedIn = req.session.loggedIn
            const userId = req.session.userId
            res.render('babies/index', { babies, username, loggedIn, userId })
        })
        .catch(err => res.redirect(`/error?error=${err}`))
    })

// GET - Show one baby
router.get('/:id', (req, res) => {
	const babyId = req.params.id
	Baby.findById(babyId)
		
		.then(baby => {
			const username = req.session.username
			const loggedIn = req.session.loggedIn
			const userId = req.session.userId
			res.render('babies/show', { baby, username, loggedIn, userId })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})



// POST - Create a new baby profile document
router.post('/', (req, res) => {
	// req.body.ready = req.body.ready === 'on' ? true : false
	req.body.owner = req.session.userId
	Baby.create(req.body)
		.then(baby => {
			console.log('This baby profile was created', baby)

			res.redirect('/babies')
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})


// // POST - Create a new baby profile document
// router.post('/', (req, res) => {
// 	// req.body.ready = req.body.ready === 'on' ? true : false
// 	req.body.owner = req.session.userId
// 	Baby.create(req.body)
// 		.then(baby => {
// 			console.log('This baby profile was created', baby)

// 			User.findById({_id: baby.owner })
// 				.then(user => {
// 					user.registeredBabies.push(req.body)
// 					return user.save()
// 				})
// 				.catch(error => {
// 					res.redirect(`/error?error=${error}`)
// 				})
// 		.catch(error => {
// 			res.redirect(`/error?error=${error}`)
// 		})
// 	})
// })


// GET - Show update page to edit baby profile 
router.get('/:id/edit', (req, res) => {
	const username = req.session.username
	const loggedIn = req.session.loggedIn
	const userId = req.session.userId
	const babyId = req.params.id
	Baby.findById(babyId)
		.then(baby => {
			res.render('babies/edit', { baby, username, loggedIn, userId })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})


// PUT - Edit/update baby profile	
router.put('/:id', (req, res) => {
	const babyId = req.params.id
	// req.body.ready = req.body.ready === 'on' ? true : false

	Baby.findById(babyId)
		.then(baby => {
			if (baby.owner == req.session.userId) {
                return baby.updateOne(req.body)
            // if owner is not the user, unauthorized status
            } else {
                res.sendStatus(401)
            }
        })
        .then(() => {
            res.redirect(`/babies/${babyId}`)
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})


// delete route
router.delete('/:id', (req, res) => {
	const babyId = req.params.id
	Baby.findByIdAndRemove(babyId)
		.then(baby => {
			res.redirect('/babies')
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// Export the Router
module.exports = router
