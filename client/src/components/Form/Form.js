import React, {useState, useEffect} from 'react';
import useStyles from './styles';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import {createPost, updatePost} from '../../actions/posts';

// Get the current ID of the post 


const Form = ({currentId, setCurrentId}) =>{
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));
    console.log(user);
    
    const [postData, setPostData] = useState({ 
        title: '', 
        message: '', 
        tags: '', 
        selectedFile: '' 
    });

    const post= useSelector( (state) => currentId ? state.posts.find( (p)=> p._id === currentId) : null);

    useEffect( ()=> {
      if(post) setPostData(post)
    }, [post]);

    const dispatch = useDispatch();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(currentId === 0 ){
          dispatch(createPost({...postData, name: user.result.name }));
        }else {
          dispatch(updatePost(currentId, {...postData, name: user.result.name }));
        }
        clear();
    }

    const clear = () => {
        setCurrentId(0); 
        setPostData({title: '', message: '', tags: '', selectedFile: '' })
    }

    if(user == null) {
      return (
        <Paper className={classes.paper}>
          <Typography variant="h6" align="center">
            Please sign in to create your own memories and like others's memories!  
          </Typography>
        </Paper>
      )
    }
    return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? 'Editing' : 'Creating' } a Memory</Typography>
        <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
        <div className={classes.fileInput}>
          <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
          </div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
    );
}

export default Form;