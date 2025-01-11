import express from 'express';
import { getPosts, createPost, updatePost, deletePost, getPostById } from '../controllers/postController.js';

const router = express.Router();

// Define a route to get a post by ID
router.get('/:id', getPostById);

// Limit and sort posts
router.get('/', getPosts);

//create new post
router.post('/', createPost);

//update post
router.put('/:id', updatePost);

//delete
router.delete('/:id', deletePost);

export default router;