// import dependencies
const mongoose = require('./connection')


const { Schema } = mongoose

const feedingSchema = new Schema(
	{
		date: { type: Date, required: true },
		time: { type: String, required: true },
        bottle: { type: Boolean, required: true },
        breast: { type: Boolean, required: true },
        amount: Number,
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
module.exports = feedingSchema