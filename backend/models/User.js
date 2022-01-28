const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			min: 3,
		},
		email: {
			type: String,
			min: 5,
		},
	},
	{ timestamps: true }
)

userSchema.set("toJSON", {
	transform: (document, returnedObj) => {
		returnedObj.id = returnedObj._id.toString()
		delete returnedObj._id
		delete returnedObj.__v
		delete returnedObj.createdAt
		// delete returnedObj.updatedAt
	},
})

module.exports = mongoose.model("User", userSchema)
