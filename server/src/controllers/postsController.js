// postsController.js - Controller for post-related operations
const Post = require('../models/Post');
const User = require('../models/User');

// Create a new post
const createPost = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    
    // Validate required fields
    if (!title || !content || !category) {
      return res.status(400).json({ error: 'Title, content, and category are required' });
    }
    
    const post = new Post({
      title,
      content,
      category,
      author: req.user.id // Assuming user is attached to req by auth middleware
    });
    
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all posts with pagination and filtering
const getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    let query = {};
    
    // Filter by category if provided
    if (req.query.category) {
      query.category = req.query.category;
    }
    
    // Filter by author if provided
    if (req.query.author) {
      query.author = req.query.author;
    }
    
    const posts = await Post.find(query)
      .populate('author', 'username')
      .populate('category', 'name')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
      
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single post by ID
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'username')
      .populate('category', 'name');
      
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a post
const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    // Check if user is the author
    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to update this post' });
    }
    
    const { title, content } = req.body;
    
    if (title) post.title = title;
    if (content) post.content = content;
    
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a post
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    // Check if user is the author
    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to delete this post' });
    }
    
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost
};