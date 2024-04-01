const mongoose = require('mongoose');
// Define Schema for User's Account Collection
const userAccountSchema = new mongoose.Schema({
    accountName: { type: String, unique: true  }
  });
  
module.exports = mongoose.model('UserAccount', userAccountSchema);
