import { Container, Typography } from "@material-ui/core";
import Link from "next/link";


import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core"
import Header from './components/Header'

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundImage: "/images/ucr_campus.png",
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
}));

// export default function App() {
//   const classes = useStyles();
//   return (<div className ={classes.root}>
//       <CssBaseline />
//     </div>
//   );
// }

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header />
    </div>
  );
}