import { Typography, AppBar, Toolbar, Button, Avatar } from "@material-ui/core";
import useStyles from "./styles";
import React, { useState, useEffect } from 'react'
// import memories from "../../images/memories.png";
import memorylogo from "../../images/memories-Logo.png";
import memoryText from "../../images/memories-Text.png";
import { Link } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useDispatch } from "react-redux"
import { useNavigate, useLocation } from "react-router-dom"
import decode from "jwt-decode";

const NavBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const classes = useStyles();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));


    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) logOut();
        }

        setUser(JSON.parse(localStorage.getItem("profile")));
    }, [location]);

    const logOut = () => {
        dispatch({ type: "LOGOUT" });
        setUser(null);
        navigate("/");
    }

    return (

        <GoogleOAuthProvider clientId="1098638947980-v20v8326tcd9ctdrcjhr9r5nj62408fa.apps.googleusercontent.com">
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Link to="/" className={classes.brandContainer}>
                    {/* <Typography component={Link} to="/" variant="h2" align="center" className={classes.heading}>Memories</Typography> */}
                    <img className={classes.image} src={memoryText} alt="icon" height="45" />
                    <img className={classes.image} src={memorylogo} alt="icon" height="40" />
                </Link>
                <Toolbar className={classes.toolbar}>
                    {user ? (
                        <div className={classes.profile}>
                            <Avatar className={classes.purple} alt={user.result.name} src={user.result.picture}>
                                {user.result.name.charAt(0)}
                            </Avatar>
                            <Typography variant="h6" className={classes.username}>{user.result.name}</Typography>
                            <Button className={classes.logout} variant="contained" color="secondary" onClick={logOut}>Logout</Button>
                        </div>
                    ) : (
                        <Button component={Link} to="/auth" color="primary" variant="contained">
                            Sign in
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </GoogleOAuthProvider>
    )
}
export default NavBar