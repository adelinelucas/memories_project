import axios from 'axios';

const url = 'http://localhost:5000/posts';

export const fecthPosts = () => axios.get(url);
export const createPost = (newPost) => {
    console.log(newPost);
    console.log(url)
    axios.post(url, newPost)}
    ;
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost)
export const deletePost = (id) => axios.delete(`${url}/${id}`);