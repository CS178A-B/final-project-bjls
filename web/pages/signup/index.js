import styles from "../../styles/pages/Signup.module.css";
import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import axios from "axios";

export default function SignUp() {
  const [signUpInfo, setSignUpInfo] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    major: "",
    department: "",
    is_student: false,
    is_faculty: false,
  });

  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const [errorHandling, setErrorHandling] = useState({});

  const handleChange = (event) => {
    setSignUpInfo({ ...signUpInfo, [event.target.id]: event.target.value });
  };
  const handleCheck = (event) => {
    setSignUpInfo({ ...signUpInfo, [event.target.id]: event.target.checked });
  };

  const handleSubmit = () => {
    setErrorHandling({});
    axios
      .post("http://localhost:8000/api/user/", signUpInfo)
      .then((r) => {
        console.log(r);
        if (r.status === 201) {
          setSignUpSuccess(true);
        }
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response.status === 400) {
          setErrorHandling(error.response.data);
        }
      });
  };

  return (
    <Container maxWidth="xs">
      <div className={styles.paper}>
        <Avatar className={styles.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {signUpSuccess ? (
          <React.Fragment>
            <Typography component="h1" variant="h5">
              Sign Up Successful.
            </Typography>
            <Link href="/login" variant="body2">
              Click here to log in.
            </Link>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  error={errorHandling.name ? true : false}
                  helperText={
                    errorHandling.name ? errorHandling.name[0] : false
                  }
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  value={signUpInfo.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  error={errorHandling.email ? true : false}
                  helperText={
                    errorHandling.email ? errorHandling.email[0] : false
                  }
                  value={signUpInfo.email}
                  onChange={handleChange}
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  error={errorHandling.username ? true : false}
                  helperText={
                    errorHandling.username ? errorHandling.username[0] : false
                  }
                  fullWidth
                  id="username"
                  label="Username"
                  value={signUpInfo.username}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  error={errorHandling.password ? true : false}
                  helperText={
                    errorHandling.password ? errorHandling.password[0] : false
                  }
                  value={signUpInfo.password}
                  onChange={handleChange}
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Major"
                  id="major"
                  value={signUpInfo.major}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Department"
                  id="department"
                  value={signUpInfo.department}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={signUpInfo["is_student"]}
                      onChange={handleCheck}
                      id="is_student"
                      color="primary"
                    />
                  }
                  label="Student"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={signUpInfo["is_faculty"]}
                      onChange={handleCheck}
                      id="is_faculty"
                      color="primary"
                    />
                  }
                  label="Faculty"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Sign Up
                </Button>
              </Grid>
            </Grid>
            <Grid container justify="flex-end">
              <Grid item className={styles.signinDirect}>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </React.Fragment>
        )}
        {/* <form className={styles.form} noValidate> */}

        {/* </form> */}
      </div>
    </Container>
  );
}
