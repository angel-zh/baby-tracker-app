// import dependencies
const mongoose = require('./connection')

// // import user model for populate
// const User = require('./user')

const { Schema } = mongoose

const sleepSchema = new Schema(
	{
		startDateTime: { type: Date, default: Date.now },
		duration: Number,
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
module.exports = sleepSchema