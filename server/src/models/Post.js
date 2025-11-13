// Post.js - Mongoose model for Post
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  published: {
    type: Boolean,
    default: false
  },
  publishedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Create slug before saving
postSchema.pre('save', function(next) {
  if (this.isModified('title') && this.title) {
    this.slug = this.title.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-');
  }
  next();
});

module.exports = mongoose.model('Post', postSchema);