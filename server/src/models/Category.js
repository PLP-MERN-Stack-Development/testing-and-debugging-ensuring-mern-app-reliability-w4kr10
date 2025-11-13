// Category.js - Mongoose model for Category
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 50
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  }
}, {
  timestamps: true
});

// Create slug before saving
categorySchema.pre('save', function(next) {
  if (this.isModified('name') && this.name) {
    this.slug = this.name.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-');
  }
  next();
});

module.exports = mongoose.model('Category', categorySchema);