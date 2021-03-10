import { makeStyles, Popover, Typography } from "@material-ui/core";
import React, { forwardRef, useImperativeHandle, useState } from "react";
const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
}));

const ApplyJobPopover = ({ anchorEl, handleClose, data }) => {
    const classes = useStyles();
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    return (
        <div>
            <Popover
                elevation={2}
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
                <Typography className={classes.typography}>
                    {data.name}
                </Typography>
            </Popover>
        </div>
    );
};

export default ApplyJobPopover;
