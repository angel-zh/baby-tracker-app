
// Import Dependencies
const express = require('express')
const Baby = require('../models/baby')



// Create Router
const router = express.Router()

// Routes
// POST
router.post('/:babyId', (req, res) => {
    const babyId = req.params.babyId
    req.body.bottle = req.body.bottle === 'on' ? true : false
    req.body.breast = req.body.breast === 'on' ? true : false
    req.body.date = new Date(req.body.date.replace(/-/g, '\/').replace(/T.+/, ''))
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

// GET - Show edit page
router.get('/:babyId/:feedingId/edit', (req, res) => {
    const username = req.session.username
	const loggedIn = req.session.loggedIn
	const userId = req.session.userId
    const babyId = req.params.babyId 
    const feedingId = req.params.feedingId
    Baby.findById(babyId)
        .then(baby => {
            const theFeeding = baby.feedings.id(feedingId)
            res.render('feedings/edit', { baby, theFeeding, username, loggedIn, userId })
        })
        .catch(error => {
            res.redirect(`/error?error=${error}`)
        })
})

// PUT - Edit subdoc
router.put('/:babyId/:feedingId', (req, res) => {
    const babyId = req.params.babyId 
    const feedingId = req.params.feedingId
    req.body.bottle = req.body.bottle === 'on' ? true : false
    req.body.breast = req.body.breast === 'on' ? true : false
    req.body.date = new Date(req.body.date.replace(/-/g, '\/').replace(/T.+/, ''))
    Baby.findById(babyId)
        .then(baby => {
            const theFeeding = baby.feedings.id(feedingId)
            if (req.session.loggedIn) {
                if (theFeeding.parent == req.session.userId) {
                    theFeeding.set(req.body)
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