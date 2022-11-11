// import dependencies
const mongoose = require('./connection')

const { Schema } = mongoose

const diaperSchema = new Schema(
	{
		date: { type: Date, required: true },
		time: { type: String, required: true },
		pee: { type: Boolean, required: true },
		poop: { type: Boolean, required: true },
		memo: { type: String, required: false },
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