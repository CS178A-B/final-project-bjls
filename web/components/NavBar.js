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
import PostJobDialog from "./PostJobDialog";

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    title: {
        marginLeft: theme.spacing(5),
        marginRight: theme.spacing(1),
        textTransform: "none",
    },
}));

export default function NavBar({
    jobData,
    setJobData,
    userInfo,
    identity,
    handleLogout,
}) {
    const classes = useStyles();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [postOpen, setPostOpen] = useState(false);
    return (
        <React.Fragment>
            <ProfileDrawer
                userInfo={userInfo}
                drawerOpen={drawerOpen}
                setDrawerOpen={setDrawerOpen}
                handleLogout={handleLogout}
                identity={identity}
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
                        <Link href={"/dashboard/" + identity}>
                            <Button
                                className={classes.title}
                                size="large"
                                color="inherit"
                            >
                                Dashboard
                            </Button>
                        </Link>

                        {identity === "student" ? (
                            <React.Fragment>
                                <Button
                                    className={classes.title}
                                    size="large"
                                    color="inherit"
                                >
                                    Applied Jobs
                                </Button>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <Button
                                    className={classes.title}
                                    size="large"
                                    color="inherit"
                                >
                                    Applications
                                </Button>
                            </React.Fragment>
                        )}

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
                        {identity === "faculty" ? (
                            <React.Fragment>
                                <Button
                                    className={classes.title}
                                    size="large"
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => {
                                        setPostOpen(true);
                                    }}
                                >
                                    Post Job
                                </Button>
                            </React.Fragment>
                        ) : (
                            <></>
                        )}
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
            {identity === "faculty" ? (
                <PostJobDialog
                    open={postOpen}
                    setOpen={setPostOpen}
                    jobData={jobData}
                    setJobData={setJobData}
                />
            ) : (
                <></>
            )}
        </React.Fragment>
    );
}
