const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const orderSchema = new mongoose.Schema({
	customer: String,
	cost: {
		type: Number,
		default: 0
	},
	date: Date,
	products: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: 'Product',
	}
}, {
	timestamps: true
})

orderSchema.plugin(AutoIncrement, {
	inc_field: 'orderId',
	id: 'orderNums',
	start_seq: 10000000
})

module.exports = mongoose.model('Order', orderSchema)
