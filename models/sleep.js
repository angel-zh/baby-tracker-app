// import dependencies
const mongoose = require('./connection')


const { Schema } = mongoose

const sleepSchema = new Schema(
	{
		date: { type: Date, required: true },
		startTime: String,
		endTime: String,
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
module.exports = sleepSchema