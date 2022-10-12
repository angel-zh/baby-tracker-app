
// Import Dependencies
const express = require('express')
const Baby = require('../models/baby')
const Feeding = require('../models/feeding')


// Create Router
const router = express.Router()

// Routes

// // GET for new feeding
// // renders the form to create a feeding
// router.get('/new', (req, res) => {
//     const username = req.session.username
//     const loggedIn = req.session.loggedIn
//     const userId = req.session.userId
//     res.render('feedings/new', { username, loggedIn, userId })
// })

// // GET - Show one feeding
// router.get('/:feedingId', (req, res) => {
// 	const feedingId = req.params.feedingId
//     .populate('feedings.baby', 'firstName')
// 	Feeding.findById(feedingId)
// 		.then(feeding => {
// 			const username = req.session.username
// 			const loggedIn = req.session.loggedIn
// 			const userId = req.session.userId
// 			res.render('feedings/show', { feeding, username, loggedIn, userId })
// 		})
// 		.catch(error => {
// 			res.redirect(`/error?error=${error}`)
// 		})
// })



// POST
router.post('/:babyId', (req, res) => {
    const babyId = req.params.babyId
    req.body.bottle = req.body.bottle === 'on' ? true : false
    req.body.breast = req.body.breast === 'on' ? true : false
    if (req.session.loggedIn) {
        req.body.parent = req.session.userId
        req.body.baby = babyId
    } else {
        res.sendStatus(401)
    }
    Baby.findById(babyId)
        .then(baby => {
            baby.feedings.push(req.body)
            return baby.save()
        })
        .then(baby => {
            res.redirect(`/babies/${baby.id}`)
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})

// DELETE
router.delete('/delete/:babyId/:feedingId', (req, res) => {
    // isolate the ids and save to vars for easy ref
    const babyId = req.params.babyId 
    const feedingId = req.params.feedingId
    Baby.findById(babyId)
        .then(baby => {
            // get the feeding
            // subdocs have a built in method that you can use to access specific subdocuments when you need to
            // this built in method is called .id()
            const theFeeding = baby.feedings.id(feedingId)
            console.log('this is the feeding that was found', theFeeding)
            // make sure the user is logged in
            if (req.session.loggedIn) {
                // only let the author of the comment delete it
                if (theFeeding.parent == req.session.userId) {
                    theFeeding.remove()
                    baby.save()
                    res.redirect(`/babies/${baby.id}`)
                } else {
                    const err = 'you%20are%20not%20authorized%20for%20this%20action'
                    res.redirect(`/error?error=${err}`)
                }
            } else {
                const err = 'you%20are%20not%20authorized%20for%20this%20action'
                    res.redirect(`/error?error=${err}`)
            }
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})


// Export the Router
module.exports = router