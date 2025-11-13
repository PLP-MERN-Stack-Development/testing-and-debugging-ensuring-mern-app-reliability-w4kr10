// posts.js - Routes for post-related operations
const express = require('express');
const router = express.Router();
const {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost
} = require('../controllers/postsController');

// Mock authentication middleware for testing
const authMiddleware = (req, res, next) => {
  // Check for authorization header
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    return res.status(401).json({ error: 'No authorization header provided' });
  }

  try {
    const token = authHeader.split(' ')[1];
    const { verifyToken } = require('../utils/auth');
    const decoded = verifyToken(token);
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

// POST /api/posts - Create a new post
router.post('/', authMiddleware, createPost);

// GET /api/posts - Get all posts with optional filtering
router.get('/', getPosts);

// GET /api/posts/:id - Get a single post by ID
router.get('/:id', getPostById);

// PUT /api/posts/:id - Update a post
router.put('/:id', authMiddleware, updatePost);

// DELETE /api/posts/:id - Delete a post
router.delete('/:id', authMiddleware, deletePost);

module.exports = router;