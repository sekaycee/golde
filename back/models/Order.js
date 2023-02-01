const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const orderSchema = new mongoose.Schema({
	customer: String,
	cost: {
		type: Number,
		default: 0
	},
	date: Date,
	items: [{
		product: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Product'
		},
		price: Number,
		quantity: Number
	}, {
		virtuals: {
			subtotal: {
				get() {
					return this.items.price * this.items.quantity
				}
			}
		}
	}]
}, {
	timestamps: true
})

orderSchema.plugin(AutoIncrement, {
	inc_field: 'orderId',
	id: 'orderNums',
	start_seq: 10000000
})

module.exports = mongoose.model('Order', orderSchema)
