const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
{
	sku: String,
	name: {
		type: String,
		required: true
	},
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
		type: Boolean,
		default: true
	},
	meta: {
		title: String,
		description: String,
		keywords: [String]
	}
},
{
	timestamps: true
}
)

module.exports = mongoose.model('Product', productSchema)
