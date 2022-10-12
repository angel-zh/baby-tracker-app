// Import Dependencies
const express = require('express')
const Baby = require('../models/baby')
const Feeding = require('../models/feeding')


// Create Router
const router = express.Router()

// Routes
// POST
router.post('/:babyId', (req, res) => {
    const babyId = req.params.babyId
    req.body.pee = req.body.pee === 'on' ? true : false
    req.body.poop = req.body.poop === 'on' ? true : false
    if (req.session.loggedIn) {
        req.body.parent = req.session.userId
        req.body.baby = babyId
    } else {
        res.sendStatus(401)
    }
    Baby.findById(babyId)
        .then(baby => {
            baby.diapers.push(req.body)
            return baby.save()
        })
        .then(baby => {
            res.redirect(`/babies/${baby.id}`)
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})

// DELETE
router.delete('/delete/:babyId/:diaperId', (req, res) => {
    // isolate the ids and save to vars for easy ref
    const babyId = req.params.babyId 
    const diaperId = req.params.diaperId
    Baby.findById(babyId)
        .then(baby => {
            const theDiaper = baby.diapers.id(diaperId)
            console.log('this is the diaper change that was found', theDiaper)
            if (req.session.loggedIn) {
                if (theDiaper.parent == req.session.userId) {
                    theDiaper.remove()
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