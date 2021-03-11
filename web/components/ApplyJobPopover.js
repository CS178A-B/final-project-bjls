import {
    Box,
    Button,
    CircularProgress,
    Container,
    Divider,
    Grid,
    makeStyles,
    Paper,
    Popover,
    Typography,
} from "@material-ui/core";
import React, { forwardRef, useImperativeHandle, useState } from "react";
const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: "center",
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        paddingBottom: theme.spacing(2),
    },
    resumeTab: { padding: theme.spacing(10) },
    buttonTab: {
        margin: theme.spacing(1),
    },
    typography: {
        padding: theme.spacing(2),
    },
}));

const ApplyJobPopover = ({ anchorEl, handleClose, data }) => {
    const classes = useStyles();
    const open = Boolean(anchorEl);
    const id = open ? data.name : undefined;

    return (
        <div>
            <Popover
                elevation={5}
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
            >
                <Container maxWidth="md" className={classes.root}>
                    <Typography
                        variant="h6"
                        component="h6"
                        className={classes.typography}
                    >
                        Your Resume
                    </Typography>
                    <Divider />
                    <Box className={classes.resumeTab}>
                        Biqian Cheng CV. pdf
                    </Box>
                    <Button
                        className={classes.buttonTab}
                        variant="contained"
                        color="primary"
                    >
                        Use
                    </Button>
                    {/* <Divider orientation="vertical"/> */}
                    <Button
                        className={classes.buttonTab}
                        variant="outlined"
                        color="primary"
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                </Container>

                {/* <Grid container justify="center" spacing={2}>
                    <Grid item xs={12}></Grid>
                    <Grid item xs={6}></Grid>
                    <Grid item xs={6}></Grid>
                </Grid> */}
            </Popover>
        </div>
    );
};

export default ApplyJobPopover;
