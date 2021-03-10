import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Grid, makeStyles, Paper, TextField } from "@material-ui/core";

import styles from "../styles/components/PostJobDialog.module.css";

export default function PostJobDialog({ jobData, setJobData, open, setOpen }) {
    const [newJobData, setNewJobData] = useState({
        name: "",
        description: "",
        poster: "",
    });

    const handleChange = (event) => {
        setNewJobData({ ...newJobData, [event.target.id]: event.target.value });
    };

    const handleSubmit = () => {
        setJobData({ ...jobData, newJobData });
        setOpen(false);
    };
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
            <DialogContent>
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
                            value={newJobData.name}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            autoFocus
                            multiline
                            rows={6}
                            variant="outlined"
                            // margin="dense"
                            id="description"
                            label="Job Description"
                            fullWidth
                            value={newJobData.description}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            autoFocus
                            variant="outlined"
                            margin="dense"
                            id="poster"
                            label="Instructor"
                            fullWidth
                            value={newJobData.poster}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button
                    color="secondary"
                    onClick={() => {
                        setOpen(false);
                    }}
                >
                    Cancel
                </Button>
                <Button color="secondary" onClick={handleSubmit}>
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
}
