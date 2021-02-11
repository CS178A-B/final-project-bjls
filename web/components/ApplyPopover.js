import { makeStyles, Popover, Typography } from "@material-ui/core";
import React, { forwardRef, useImperativeHandle, useState } from "react";
const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
}));

const ApplyPopover = forwardRef((props, ref) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    useImperativeHandle(ref, () => {
        handleClick, handleClose;
    });

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    return (
        <div>
            <Popover
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
                    The content of the Popover.
                </Typography>
            </Popover>
        </div>
    );
});

export default ApplyPopover;
