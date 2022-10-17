// Import Dependencies
const express = require('express')
const Baby = require('../models/baby')
const formatDate = require('../utils/formatDate')

// Create router
const router = express.Router()


// Routes
// GET - index all babies
router.get('/', (req, res) => {
    Baby.find({ owner: req.session.userId })
        .then(babies => {
            const username = req.session.username
            const loggedIn = req.session.loggedIn
            const userId = req.session.userId
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
	req.body.owner = req.session.userId 
	req.body.dateOfBirth = formatDate(req.body.dateOfBirth)
	console.log(req.body.dateOfBirth)
	Baby.create(req.body)
		.then(baby => {
			console.log('This baby profile was created', baby)
			res.redirect('/babies')
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})


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
	req.body.dateOfBirth = formatDate(req.body.dateOfBirth)
	const babyId = req.params.id
	Baby.findById(babyId)
		.then(baby => {
			if (baby.owner == req.session.userId) {
                return baby.updateOne(req.body)
            } else {
                res.sendStatus(401)
            }
        })
        .then(() => {
            res.redirect(`/babies/${babyId}`)
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})


// DELETE - Delete baby profile and all subdocs attached
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
