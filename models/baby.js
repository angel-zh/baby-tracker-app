// import dependencies
const mongoose = require('./connection')

// import user model for populate
const User = require('./user')
const diaperSchema = require('./diaper')
const feedingSchema = require('./feeding')
const sleepSchema = require('./sleep')


// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose

const babySchema = new Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		dateOfBirth: { type: Date, required: true },
		gender: { type: String, required: true },
		parent: {
			type: Schema.Types.ObjectID,
			ref: 'User',
		},
		diapers: [diaperSchema],
		feedings: [feedingSchema],
		sleep: [sleepSchema]
	},
	{ timestamps: true }
)

const Baby = model('Baby', babySchema)

/////////////////////////////////
// Export our Model
/////////////////////////////////
module.exports = Baby
