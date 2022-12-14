import React, {useState, useEffect} from 'react';
import {AppBar, Toolbar, Typography, Avatar, Button} from '@material-ui/core';
import useStyles from './styles';
import memories from '../../images/memories.png';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import { useDispatch } from 'react-redux';


const Navbar = () => {
    const classes = useStyles();
    // const user = null;

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    console.log(user);
    const dispatch = useDispatch();
    const history = useNavigate(); 
    const location = useLocation();

    useEffect( ()=> {
        const token = 'user.token';

        // JWT

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    const logout = () => {
        dispatch({type:'LOGOUT'});
        history('/');
        setUser(null);
    }

   return (
        <AppBar className={classes.AppBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to='/' className={classes.heading} variant="h2" align="center">Memories
                    <img className={classes.image} src={memories} alt="memories" height="60" />
                </Typography>
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to='/auth' variant="contained" color="primary" >Sign in</Button>
                )}
            </Toolbar>
        </AppBar>
   )
};

export default Navbar;