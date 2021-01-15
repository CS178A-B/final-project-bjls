// import Link from "next/link";
// import styles from "../styles/components/NavBar.module.css";
// import React, { createRef, useRef, useState } from "react";
// import { createMuiTheme, makeStyles } from "@material-ui/core/styles";
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";
// import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from "@material-ui/icons/Menu";
// import { ThemeProvider } from "@material-ui/styles";

// import ProfileDrawer from "./ProfileDrawer";

// export default function NavBar({
//   jobData,
//   setJobData,
//   UserInfo,
//   handleLogout,
// }) {
//   const [drawerOpen, setDrawerOpen] = useState(false);

//   return (
//     <React.Fragment>
//
//       <div className={styles.root}>
//         <AppBar position="static" color="primary">
//           <Toolbar>
//             <Button color="inherit" onClick={""} className={styles.title}>
//               Dashboard
//             </Button>
//             <Button color="inherit" onClick={""} className={styles.title}>
//               Applied Jobs
//             </Button>
//             <Button color="inherit" onClick={""} className={styles.title}>
//               Favourite Jobs
//             </Button>
//             <Button color="inherit" onClick={""} className={styles.title}>
//               Pending Applications
//             </Button>

//             <Button
//               color="inherit"
//               onClick={handleLogout}
//               className={styles.logOut}
//             >
//               Log out
//             </Button>
//           </Toolbar>
//         </AppBar>
//       </div>
//     </React.Fragment>
//   );
// }

import React, { createRef, useRef, useState } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";

import ProfileDrawer from "./ProfileDrawer";
import { Button, Link } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    marginRight: theme.spacing(6),
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#0069d9",
      borderColor: "#0062cc",
      boxShadow: "none",
    },
  },
  // search: {
  //   position: "relative",
  //   borderRadius: theme.shape.borderRadius,
  //   backgroundColor: fade(theme.palette.common.white, 0.15),
  //   "&:hover": {
  //     backgroundColor: fade(theme.palette.common.white, 0.25),
  //   },
  //   marginRight: theme.spacing(2),
  //   marginLeft: 0,
  //   width: "100%",
  //   [theme.breakpoints.up("sm")]: {
  //     marginLeft: theme.spacing(3),
  //     width: "auto",
  //   },
  // },
  // searchIcon: {
  //   padding: theme.spacing(0, 2),
  //   height: "100%",
  //   position: "absolute",
  //   pointerEvents: "none",
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  // inputRoot: {
  //   color: "inherit",
  // },
  // inputInput: {
  //   padding: theme.spacing(1, 1, 1, 0),
  //   // vertical padding + font size from searchIcon
  //   paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
  //   transition: theme.transitions.create("width"),
  //   width: "100%",
  //   [theme.breakpoints.up("md")]: {
  //     width: "20ch",
  //   },
  // },
  // sectionDesktop: {
  //   display: "none",
  //   [theme.breakpoints.up("md")]: {
  //     display: "flex",
  //   },
  // },
  // sectionMobile: {
  //   display: "flex",
  //   [theme.breakpoints.up("md")]: {
  //     display: "none",
  //   },
  // },
}));

export default function NavBar({
  jobData,
  setJobData,
  UserInfo,
  handleLogout,
}) {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <React.Fragment>
      <ProfileDrawer
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        jobData={jobData}
        setJobData={setJobData}
      />
      <div className={classes.grow}>
        <AppBar position="static">
          <Toolbar>
            <Button className={classes.title} size="large" color="inherit">
              Dashboard
            </Button>
            <Button className={classes.title} size="large" color="inherit">
              Applied Jobs
            </Button>
            <Button className={classes.title} size="large" color="inherit">
              Favorite Jobs
            </Button>
            <Button className={classes.title} size="large" color="inherit">
              Applications
            </Button>
            {/* <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div> */}
            <div className={classes.grow} />
            <IconButton
              edge="end"
              onClick={() => {
                setDrawerOpen(true);
              }}
              className={classes.title}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    </React.Fragment>
  );
}
