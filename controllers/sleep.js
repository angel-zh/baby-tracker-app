// Import Dependencies
const express = require('express')
const Baby = require('../models/baby')
const Sleep = require('../models/sleep')


// Create Router
const router = express.Router()

// Routes
// POST
router.post('/:babyId', (req, res) => {
    const babyId = req.params.babyId
    // req.body.bottle = req.body.bottle === 'on' ? true : false
    // req.body.breast = req.body.breast === 'on' ? true : false
    if (req.session.loggedIn) {
        req.body.parent = req.session.userId
        req.body.baby = babyId
    } else {
        res.sendStatus(401)
    }
    Baby.findById(babyId)
        .then(baby => {
            baby.sleepSessions.push(req.body)
            return baby.save()
        })
        .then(baby => {
            res.redirect(`/babies/${baby.id}`)
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})

// DELETE
router.delete('/delete/:babyId/:sleepId', (req, res) => {
    // isolate the ids and save to vars for easy ref
    const babyId = req.params.babyId 
    const sleepId = req.params.sleepId
    Baby.findById(babyId)
        .then(baby => {
            // get the sleep session
            // subdocs have a built in method that you can use to access specific subdocuments when you need to
            // this built in method is called .id()
            const theSleep = baby.sleepSessions.id(sleepId)
            console.log('this is the sleep session that was found', theSleep)
            // make sure the user is logged in
            if (req.session.loggedIn) {
                // only let the parent of the sleep session delete it
                if (theSleep.parent == req.session.userId) {
                    theSleep.remove()
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