const mongoose = require('mongoose');

const policyCarrierSchema = new mongoose.Schema({
    companyName: { type: String, required: true, unique: true, ref: 'PolicyInfo' }
  });
  
module.exports = mongoose.model('PolicyCarrier', policyCarrierSchema);
