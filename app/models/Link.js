// Link.js (models/Link.js)
const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  hits: { type: Number, default: 0 }
});

module.exports = mongoose.model('Link', linkSchema);
