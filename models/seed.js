// Import Dependencies
const mongoose = require('./connection')
const Baby = require('./baby')
const User = require('./user')

// Seed Script Code
const db = mongoose.connection
db.on('open', () => {
    const startBabies = [
        { firstName: 'Miles', lastName: 'Janson', dateOfBirth: '2022/08/10', gender: 'Boy', owner: '6345d2fee678fe23368ad3be' },
        { firstName: 'Sally', lastName: 'Pickle', dateOfBirth: '2022/09/25', gender: 'Girl', owner: '6345d2fee678fe23368ad3be' },
        // { firstName: 'Keith', lastName: 'Evanson', dateOfBirth: '2022-09-02', gender: 'Boy' },
        // { firstName: 'Chloe', lastName: 'Evanson', dateOfBirth: '2022-09-02', gender: 'Girl' },
    ]

    Baby.deleteMany ()
    // ({ owner: null })
        .then(deletedBabies => {
            console.log('this is what .deleteMany returns', deletedBabies)
            Baby.create(startBabies)
                .then(data => {
                    console.log('here are the newly created baby profiles', data)
                    db.close()
                })
                .catch(err => {
                    console.log(err)
                    db.close()
                })
        })
        .catch(err => {
            console.log(err)
            db.close()
        })
})