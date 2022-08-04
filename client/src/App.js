import React, {useEffect, useState} from "react";
import {Container, AppBar, Typography, Grow, Grid} from '@material-ui/core';
import { useDispatch } from "react-redux";
import {getPosts} from './actions/posts';
import memories from './images/memories.png';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import useStyles from './styles';

const App = () =>{

    const classes = useStyles();
    const dispatch = useDispatch();
    const [currentId, setCurrentId] = useState(null);

    useEffect( () => {
        dispatch(getPosts());
    }, [currentId, dispatch]);

    return (
        <Container maxidth="lg">
            <AppBar className={classes.AppBar} position="static" color="inherit">
                <Typography className={classes.heading} variant="h2" align="center">Memories
                    <img className={classes.image} src={memories} alt="memories" height="60" />
                </Typography>
            </AppBar> 
            <Grow in>
                <Container>
                    <Grid container className={classes.mainContainer} justify="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts setCurrentId={setCurrentId} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form currentId={currentId} setCurrentId={setCurrentId} />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    );
}

export default App;