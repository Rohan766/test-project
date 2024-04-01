const mongoose = require("mongoose");

const policyInfoSchema = new mongoose.Schema({
  policyNumber: { type: String, required: true },
  policyStartDate: { type: Date, required: true },
  policyEndDate: { type: Date, required: true },
  policyCategory: {
    type: String,
    ref: "PolicyCategory",
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PolicyCarrier",
    default: 'defaultcompanyNameId' // Specify the default ObjectId here

  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}, 
});

module.exports = mongoose.model("PolicyInfo", policyInfoSchema);
