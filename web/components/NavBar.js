import React, { createRef, useRef, useState } from "react";
import Image from "next/image";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";

import ProfileDrawer from "./ProfileDrawer";
import { Button } from "@material-ui/core";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    title: {
        marginLeft: theme.spacing(5),
        marginRight: theme.spacing(1),
        textTransform: "none",
        "&:hover": {
            backgroundColor: "#0069d9",
            borderColor: "#0062cc",
            boxShadow: "none",
        },
    },
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
                        <Image
                            src="/images/ucrLogo.png"
                            alt="ucr_logo"
                            width={40}
                            height={40}
                        />
                        <Link href="/dashboard">
                            <Button
                                className={classes.title}
                                size="large"
                                color="inherit"
                            >
                                Dashboard
                            </Button>
                        </Link>

                        <Button
                            className={classes.title}
                            size="large"
                            color="inherit"
                        >
                            Applied Jobs
                        </Button>
                        <Button
                            className={classes.title}
                            size="large"
                            color="inherit"
                        >
                            Favorite Jobs
                        </Button>
                        <Button
                            className={classes.title}
                            size="large"
                            color="inherit"
                        >
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
