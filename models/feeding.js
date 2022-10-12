// import dependencies
const mongoose = require('./connection')

// // import user model for populate
// const User = require('./user')

const { Schema } = mongoose

const feedingSchema = new Schema(
	{
		startDateTime: { type: Date, default: Date.now },
		endDateTime: Date,
        bottle: { type: Boolean, required: true},
        breast: { type: Boolean, required: true},
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