import React, { useState, useEffect, useLayoutEffect } from "react";
import { useRouter } from "next/router";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
// import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import styles from "../../styles/pages/Login.module.css";
import Link from "next/link";

import axios from "axios";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://material-ui.com/">
                BJLS
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

// const useStyles = makeStyles((theme) => ({
//   root: {
//     height: '100vh',
//   },
//   image: {
//     backgroundImage: 'url(https://source.unsplash.com/random)',
//     backgroundRepeat: 'no-repeat',
//     backgroundColor:
//       theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//   },
//   paper: {
//     margin: theme.spacing(8, 4),
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.main,
//   },
//   form: {
//     width: '100%', // Fix IE 11 issue.
//     marginTop: theme.spacing(1),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
// }));
function SignInSide() {
    const [logedIn, setLogedIn] = useState(false);
    const [logedError, setLogedError] = useState(false);
    const [loginInfo, setLoginInfo] = useState({
        username: "",
        password: "",
    });
    const router = useRouter();

    const handleChange = (event) => {
        setLoginInfo({ ...loginInfo, [event.target.id]: event.target.value });
    };
    const handleCheck = (event) => {
        setLoginInfo({ ...loginInfo, [event.target.id]: event.target.checked });
    };

    const handleSubmit = () => {
        setLogedError(false);
        axios
            .post("http://localhost:8000/api/token-auth/", loginInfo)
            .then((r) => {
                console.log(r);
                if (r.status === 200) {
                    setLogedIn(true);
                    if (typeof window !== "undefined") {
                        window.localStorage.setItem("tokenF", r.data.token);
                    }
                    router.push("/dashboard/faculty");
                }
            })
            .catch((error) => {
                console.log(error.response);
                if (error.response.status === 400) {
                    setLogedError(true);
                }
            });
    };

    useEffect(() => {
        if (localStorage.getItem("tokenF")) {
            axios
                .get("http://localhost:8000/api/current_user", {
                    headers: {
                        Authorization: `JWT ${localStorage.getItem("tokenF")}`,
                    },
                })
                .then((r) => {
                    console.log(r);
                    router.push("/dashboard/faculty");
                })
                .catch((e) => {
                    console.log(e.response);
                });
        }
    }, []);

    // const styles = useStyles();
    return (
        <Grid container component="main" className={styles.root}>
            <Grid
                item
                xs={12}
                sm={8}
                md={5}
                component={Paper}
                elevation={6}
                square
            >
                <div className={styles.paper}>
                    <Avatar className={styles.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in As a faculty
                    </Typography>
                    {logedError ? (
                        <div style={{ color: "red" }}>
                            Incorrect Username or Password{" "}
                        </div>
                    ) : (
                        <div></div>
                    )}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        value={loginInfo.username}
                        onChange={handleChange}
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={loginInfo.password}
                        onChange={handleChange}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />

                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={styles.submit}
                                onClick={handleSubmit}
                            >
                                Sign In
                            </Button>
                        </Grid>
                        {/* <Grid item xs={6}>
                            <Link href="/signup/student" variant="body2">
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="secondary"
                                    className={styles.submit}
                                >
                                    Sign Up as a Student
                                </Button>
                            </Link>
                        </Grid> */}
                        <Grid item xs={12}>
                            <Link href="/signup/faculty" variant="body2">
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="outlined"
                                    color="secondary"
                                    className={styles.submit}
                                >
                                    Sign Up as a Faculty
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                    <Box mt={5}>
                        <Copyright />
                    </Box>
                </div>
            </Grid>
            <Grid item xs={false} sm={4} md={7} className={styles.image} />
        </Grid>
    );
}

export default function LoginPage() {
    return <SignInSide />;
}
