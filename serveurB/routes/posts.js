import express from 'express';
const router = express.Router();
import {getPosts, createPost} from '../controllers/posts.controller.js'
// localhost:5000/posts

router.get('/',getPosts);
router.get('/',createPost);

export default router;