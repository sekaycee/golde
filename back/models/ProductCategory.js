const mongoose = require('mongoose')

const productCategorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	active: {
		type: Boolean,
		default: true
	}
})

module.exports = mongoose.model('ProductCategory', productCategorySchema)
