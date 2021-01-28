import React from "react";
import { List, ListItem, makeStyles } from "@material-ui/core";
import JobCard from "./JobCard";

const useStyles = makeStyles((theme) => ({
    flexContainer: {
        display: "flex",
        flexDirection: "row",
        padding: 0,
        overflowX: "auto",
    },
    card: {
        height: theme.spacing(50),
        padding: theme.spacing(0, 2, 0, 2),
    },
}));

const JobSingelLineList = ({ data }) => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <List className={classes.flexContainer}>
                {data.map((item) => {
                    return (
                        <ListItem className={classes.card}>
                            <JobCard
                                // className={classes.card}
                                name={item.name}
                                description={item.description}
                                poster={item.poster}
                            />
                        </ListItem>
                    );
                })}
            </List>
        </React.Fragment>
    );
};

export default JobSingelLineList;
