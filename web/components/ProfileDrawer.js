import React, { forwardRef, useImperativeHandle, useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import {
    Avatar,
    Button,
    Divider,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Menu,
    MenuItem,
    ThemeProvider,
    Tooltip,
    Typography,
} from "@material-ui/core";

import styles from "../styles/components/ProfileDrawer.module.css";
import PostJobDialog from "./PostJobDialog";

import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
    list: {
        width: 250,
    },
    avatar: {
        padding: "2rem",
    },
    logOut: {
        color: "red",
    },
}));

export default function ProfileDrawer({
    jobData,
    setJobData,
    UserInfo,
    drawerOpen,
    setDrawerOpen,
    handleLogout,
}) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [postOpen, setPostOpen] = useState(false);
    const statusMenu = Boolean(anchorEl);
    return (
        <React.Fragment>
            <PostJobDialog
                open={postOpen}
                setOpen={setPostOpen}
                jobData={jobData}
                setJobData={setJobData}
            />
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => {
                    setDrawerOpen(false);
                }}
            >
                <List>
                    <Avatar className={styles.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <ListItemText
                        className={styles.nameList}
                        primary={
                            <Typography
                                component="span"
                                variant="h5"
                                color="textPrimary"
                            >
                                Biqian Cheng
                            </Typography>
                        }
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    color="textSecondry"
                                >
                                    Seeking
                                    <IconButton
                                        onClick={(event) => {
                                            setAnchorEl(event.currentTarget);
                                        }}
                                        size="small"
                                    >
                                        <ArrowDropDownIcon />
                                    </IconButton>
                                    <Menu
                                        id="status-menu"
                                        anchorEl={anchorEl}
                                        open={statusMenu}
                                        keepMounted
                                        onClose={() => {
                                            setAnchorEl(null);
                                        }}
                                    >
                                        <MenuItem>Seeking</MenuItem>
                                        <MenuItem>Not Seeking</MenuItem>
                                    </Menu>
                                </Typography>
                            </React.Fragment>
                        }
                    />
                </List>
                <Divider />
                <div className={styles.listItem}>
                    <List>
                        <Link href="/dashboard/profile">
                            <ListItem button key="profile">
                                <ListItemIcon>
                                    <SettingsIcon />
                                </ListItemIcon>

                                <ListItemText primary="Account Settings" />
                            </ListItem>
                        </Link>
                        <ListItem button onClick={handleLogout} key="logout">
                            <ListItemIcon>
                                <ExitToAppIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="Log Out"
                                className={classes.logOut}
                            />
                        </ListItem>
                    </List>
                </div>
            </Drawer>
        </React.Fragment>
    );
}
