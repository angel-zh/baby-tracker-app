// import dependencies
const mongoose = require('./connection')

// // import user model for populate
// const User = require('./user')

const { Schema } = mongoose

const diaperSchema = new Schema(
	{
		date: { type: Date, default: Date.now },
		time: { type: String, required: true},
        pee: { type: Boolean, required: true},
		poop: { type: Boolean, required: true},
        memo: String,
		baby: {
			type: Schema.Types.ObjectID,
			ref: 'Baby',
            required: true
		},
		parent: {
			type: Schema.Types.ObjectId,
        	ref: 'User',
        	required: true
		}
	},
	{ timestamps: true }
)


/////////////////////////////////
// Export our Model
/////////////////////////////////
module.exports = diaperSchema