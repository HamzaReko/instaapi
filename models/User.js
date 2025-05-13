const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  schedule: { type: String, enum: ['daily', 'every2days'], required: true },
  hourGMT: { type: Number, required: true }, // 0 to 23
  currentPage: { type: Number, default: 1 },
  platform: { type: String, default: 'instagram' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema,'insta');
