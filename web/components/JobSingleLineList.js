import React, { useState } from "react";
import { List, ListItem, makeStyles } from "@material-ui/core";
import JobCard from "./JobCard";
import ApplyJobPopover from "./ApplyJobPopover";
const useStyles = makeStyles((theme) => ({
    flexContainer: {
        display: "flex",
        flexDirection: "row",
        padding: 0,
        overflowX: "auto",
    },
    ListCard: {
        height: theme.spacing(50),
        padding: theme.spacing(0, 2, 0, 2),
    },
    card: {
        padding: theme.spacing(2),
    },
}));

const JobSingelLineList = ({ data }) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const handleApplyClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleApplyClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <List className={classes.flexContainer}>
                {data.map((item) => {
                    return (
                        <ListItem className={classes.ListCard}>
                            <ApplyJobPopover
                                anchorEl={anchorEl}
                                handleClose={handleApplyClose}
                                data={item}
                            />
                            <JobCard
                                // className={classes.card}
                                key={item.name}
                                name={item.name}
                                description={item.description}
                                poster={item.poster}
                                handleApplyClick={handleApplyClick}
                            />
                        </ListItem>
                    );
                })}
            </List>
        </React.Fragment>
    );
};

export default JobSingelLineList;
