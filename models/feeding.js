// import dependencies
const mongoose = require('./connection')


const { Schema } = mongoose

const feedingSchema = new Schema( // schemas are JS class instances and should be capitalized 
	{
		date: { type: Date, required: true },// inconsistent format here, where the values are objects, make them open or closed, and stick with it through out - don't mix em 
		time: { type: String, required: true },
        bottle: { type: Boolean, required: true },// could have been combined to 1 kvp, byBreast: false - implies bottle 
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
module.exports = feedingSchema // schemas are JS class instances and should be capitalized