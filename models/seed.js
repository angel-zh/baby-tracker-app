// Import Dependencies
const mongoose = require('./connection')
const Baby = require('./baby')
const User = require('./user')

// Seed Script Code
const db = mongoose.connection
db.on('open', () => {
    const startBabies = [
        { firstName: 'Miles', lastName: 'Janson', dateOfBirth: '2022/08/10', gender: 'Boy', eye: 'Green', hair: 'Brown', owner: '634dad18c9cb6254c1555128' },
        { firstName: 'Sally', lastName: 'Pickle', dateOfBirth: '2022/08/13', gender: 'Girl', eye: 'Hazel', hair: 'Blond', owner: '634dad18c9cb6254c1555128' },
        { firstName: 'Fiona', lastName: 'Chan', dateOfBirth: '2022/07/25', gender: 'Girl', eye: 'Black', hair: 'Black', owner: '634dad18c9cb6254c1555128' },
        { firstName: 'Keith', lastName: 'Hutson', dateOfBirth: '2022/06/02', gender: 'Boy', eye: 'Blue', hair: 'Brown', owner: '634dad18c9cb6254c1555128' },
        { firstName: 'Chloe', lastName: 'Hutson', dateOfBirth: '2022/06/02', gender: 'Girl', eye: 'Blue', hair: 'Brown', owner: '634dad18c9cb6254c1555128' },
        { firstName: 'Mark', lastName: 'Peterson', dateOfBirth: '2022/08/20', gender: 'Boy', eye: 'Brown', hair: 'Brown', owner: '634dad18c9cb6254c1555128' },
        { firstName: 'Helen', lastName: 'Park', dateOfBirth: '2022/09/02', gender: 'Girl', eye: 'Black', hair: 'Brown', owner: '634dad18c9cb6254c1555128' },
        { firstName: 'Dwyane', lastName: 'Irvine', dateOfBirth: '2022/05/16', gender: 'Boy', eye: 'Hazel', hair: 'Blond', owner: '634dad18c9cb6254c1555128' },
        { firstName: 'Wilfred', lastName: 'Irvine', dateOfBirth: '2022/05/16', gender: 'Boy', eye: 'Blue', hair: 'Blond', owner: '634dad18c9cb6254c1555128' },
        { firstName: 'Marcus', lastName: 'Irvine', dateOfBirth: '2022/05/16', gender: 'Boy', eye: 'Blue', hair: 'Blond', owner: '634dad18c9cb6254c1555128' },
        { firstName: 'Gabrielle', lastName: 'Lee', dateOfBirth: '2022/06/19', gender: 'Girl', eye: 'Black', hair: 'Black', owner: '634dad18c9cb6254c1555128' },
        { firstName: 'Zoey', lastName: 'Jung', dateOfBirth: '2022/07/10', gender: 'Girl', eye: 'Black', hair: 'Black', owner: '634dad18c9cb6254c1555128' },
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