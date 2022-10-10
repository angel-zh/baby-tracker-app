// import dependencies
const mongoose = require('./connection')

// // import user model for populate
// const User = require('./user')

const { Schema } = mongoose

const diaperSchema = new Schema(
	{
		dateTime: { type: Date, default: Date.now },
		poop: { type: Boolean, required: true},
        pee: { type: Boolean, required: true},
        memo: String,
		baby: {
			type: Schema.Types.ObjectID,
			ref: 'Baby',
            required: true
		}
	},
	{ timestamps: true }
)


/////////////////////////////////
// Export our Model
/////////////////////////////////
module.exports = diaperSchema