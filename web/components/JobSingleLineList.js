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

const JobSingelLineList = ({ data, index }) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [popoverId, setPopoverId] = useState(null);
    const handleApplyClick = (event, index) => {
        setPopoverId(index);
        setAnchorEl(event.currentTarget);
    };
    const handleApplyClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <List className={classes.flexContainer}>
                {data ? (
                    data.map((item, index) => {
                        return (
                            <ListItem key={index} className={classes.ListCard}>
                                <JobCard
                                    // className={classes.card}
                                    key={index}
                                    name={item.name}
                                    index={index}
                                    description={item.description}
                                    poster={item.poster}
                                    handleApplyClick={handleApplyClick}
                                />
                            </ListItem>
                        );
                    })
                ) : (
                    <></>
                )}
            </List>
            {popoverId ? (
                <ApplyJobPopover
                    data={data[popoverId]}
                    anchorEl={anchorEl}
                    handleClose={handleApplyClose}
                />
            ) : (
                <></>
            )}
        </React.Fragment>
    );
};

export default JobSingelLineList;
