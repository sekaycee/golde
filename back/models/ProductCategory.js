const mongoose = require('mongoose')

const productCategorySchema = new mongoose.Schema({
	thumbnail: String,
	name: {
		type: String,
		required: true
	},
	description: String,
	active: {
		type: Boolean,
		default: true
	},
	meta: {
		title: String,
		description: String,
		keywords: [String]
	}
})

module.exports = mongoose.model('ProductCategory', productCategorySchema)
