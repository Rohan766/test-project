const mongoose = require('mongoose');

// Define Agent Schema
const agentSchema = new mongoose.Schema({
    agentName: { type: String, required: true }
});

// Define User Schema
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    dob: { type: Date, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    email: { type: String, required: true },
    gender: { type: String, required: true },
    userType: { type: String, required: true },
    agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' } // Reference to Agent collection
});

// Define User's Account Schema
const userAccountSchema = new mongoose.Schema({
    accountName: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Reference to User collection
});

// Define Policy Category Schema
const policyCategorySchema = new mongoose.Schema({
    categoryName: { type: String, required: true }
});

// Define Policy Carrier Schema
const policyCarrierSchema = new mongoose.Schema({
    companyName: { type: String, required: true }
});

// Define Policy Info Schema
const policyInfoSchema = new mongoose.Schema({
    policyNumber: { type: String, required: true },
    policyStartDate: { type: Date, required: true },
    policyEndDate: { type: Date, required: true },
    policyCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'PolicyCategory' }, // Reference to Policy Category collection
    policyCarrierId: { type: mongoose.Schema.Types.ObjectId, ref: 'PolicyCarrier' }, // Reference to Policy Carrier collection
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Reference to User collection
});

// Define models
const Agent = mongoose.model('Agent', agentSchema);
const User = mongoose.model('User', userSchema);
const UserAccount = mongoose.model('UserAccount', userAccountSchema);
const PolicyCategory = mongoose.model('PolicyCategory', policyCategorySchema);
const PolicyCarrier = mongoose.model('PolicyCarrier', policyCarrierSchema);
const PolicyInfo = mongoose.model('PolicyInfo', policyInfoSchema);

module.exports = { Agent, User, UserAccount, PolicyCategory, PolicyCarrier, PolicyInfo };
