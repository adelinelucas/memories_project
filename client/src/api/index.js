import axios from 'axios';

const url = 'http://localhost:5000/posts';

export const fecthPosts = () => axios.get(url);
export const createPost = (newPost) => {
    console.log(newPost);
    console.log(url)
    axios.post(url, newPost)}
    ;
