import express from 'express';
import {getPosts, createPost} from '../controllers/posts.controller.js'
// localhost:5000/posts
const router = express.Router();

router.get('/',getPosts);
router.post('/',createPost);

export default router;