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
import EventIcon from "@material-ui/icons/Event";
import AddBoxIcon from "@material-ui/icons/AddBox";
import FavoriteIcon from "@material-ui/icons/Favorite";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  avatar: {
    padding: "2rem",
  },
});

export default function ProfileDrawer({ UserInfo, drawerOpen, setDrawerOpen }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [postOpen, setPostOpen] = useState(false);
  const statusMenu = Boolean(anchorEl);
  return (
    <React.Fragment>
      <PostJobDialog open={postOpen} setOpen={setPostOpen} />
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
        }}
      >
        <Grid
          className={styles.buttonGrid}
          container
          justify="center"
          spacing={2}
        >
          <Grid item xs={3}>
            <Tooltip title="Favorite">
              <IconButton>
                <FavoriteIcon />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={1}>
            <Divider orientation="vertical" />
          </Grid>
          <Grid item xs={3}>
            <Tooltip title="Post Job">
              <IconButton
                onClick={() => {
                  setPostOpen(true);
                }}
              >
                <AddBoxIcon />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={1}>
            <Divider orientation="vertical" />
          </Grid>
          <Grid item xs={3}>
            <Tooltip title="Calender">
              <IconButton>
                <EventIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
        <Divider />
        <List>
          <Avatar className={styles.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <ListItemText
            className={styles.nameList}
            primary={
              <Typography component="span" variant="h5" color="textPrimary">
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
                    <MenuItem>Idk</MenuItem>
                  </Menu>
                </Typography>
              </React.Fragment>
            }
          />
        </List>
        <Divider />
        <div className={styles.listItem}>
          <List>
            {["Applied Jobs", "Favoirte Jobs"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </React.Fragment>
  );
}
