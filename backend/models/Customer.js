const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phno: {
    type: String,
    required: true,
  },
  roomno: {
    type: String,
    require: true,
  },
  rent: {
    type: String,
    require: true,
  },
  deposit: {
    type: String,
    require: true,
  },
  due: {
    type: String,
    required: true,
  }
}, { timestamps: true });
const Customer = mongoose.model('CustomerDetails', customerSchema);
module.exports = Customer;