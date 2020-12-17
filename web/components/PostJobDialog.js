import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Grid, makeStyles, Paper, TextField } from "@material-ui/core";

import styles from "../styles/components/PostJobDialog.module.css";

export default function PostJobDialog({ open, setOpen }) {
  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="lg"
      onClose={() => {
        setOpen(false);
      }}
    >
      <DialogTitle id="dialog-title">Post A New Job</DialogTitle>
      <DialogContent dividers={scroll === "paper"}>
        <Grid container justify="center" spacing={4}>
          <Grid item xs={12}>
            <TextField
              autoFocus
              variant="outlined"
              margin="dense"
              id="name"
              label="Job Title"
              type="email"
              fullWidth
            />
          </Grid>
          <Grid item xs={5}>
            <Paper elevation={3} className={styles.paper}></Paper>
          </Grid>
          <Grid item xs={7}>
            <Paper elevation={3} className={styles.paper}></Paper>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button color="primary">Cancel</Button>
        <Button color="primary">Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
}
