// import dependencies
const mongoose = require('./connection')

// import user model for populate
const User = require('./user')

// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose

const babySchema = new Schema(
	{
		firstName: { type: String, required: true },
		dateOfBirth: { type: Date, required: true },
        gender: { type: String, required: true },
		parent: {
			type: Schema.Types.ObjectID,
			ref: 'User',
		}
	},
	{ timestamps: true }
)

const Example = model('Baby', babySchema)

/////////////////////////////////
// Export our Model
/////////////////////////////////
module.exports = Baby
