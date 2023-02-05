const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
	sku: String,
	name: {
		type: String,
		required: true
	},
	thumbnail: String,
	description: String,
	tags: [String],
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'ProductCategory'
	},
	salePrice: {
		type: Number,
		default: 0
	},
	costPrice: {
		type: Number,
		default: 0
	},
	quantity: {
		type: Number,
		default: 0
	},
	state: {
		type: String,
		enum: ['Active', 'Restock', 'Pending', 'Inactive'],
		default: 'Active'
	},
	meta: {
		title: String,
		description: String,
		keywords: [String]
	}
}, {
	timestamps: true
})

module.exports = mongoose.model('Product', productSchema)
