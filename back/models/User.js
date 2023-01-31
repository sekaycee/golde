const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	name: {
		first: String,
		last: String
	},
	password: {
		type: String,
		required: true
	},
	roles: [{
		type: String,
		default: 'Employee'
	}],
	active: {
		type: Boolean,
		default: true
	}
}, {
	virtuals: {
		fullname: {
			get() {
				return this.name.first + ' ' + this.name.last
			}
		}
	}
})

module.exports = mongoose.model('User', userSchema)
