import {
    Avatar,
    Button,
    Container,
    Grid,
    List,
    ListItem,
    ListItemText,
    makeStyles,
    Paper,
    Typography,
} from "@material-ui/core";
import Image from "next/image";
import React from "react";

import NavBar from "../../../components/NavBar";

const useStyles = makeStyles((theme) => ({
    banner: {
        position: "relative",
        width: "98vw",
        height: "20em",
        objectFit: "cover",
        marginBottom: theme.spacing(4),
    },
    profilePic: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
    descriptionPaper: {
        height: theme.spacing(10),
        // marginRight: theme.spacing(2),
    },
    middlePaper: {
        height: theme.spacing(30),
        padding: theme.spacing(3),
        overflow: "auto",
    },
    button: {
        margin: theme.spacing(3),
        float: "right",
    },
}));

function ProfilePage(props) {
    const classes = useStyles();
    return (
        <>
            <NavBar />
            <div className={classes.banner}>
                <Image
                    src="/images/ucrBanner.jpg"
                    alt="ucr_banner"
                    layout="fill"
                />
            </div>
            <Container maxWidth="xl">
                <Grid container spacing={5}>
                    <Grid container item xs={10} spacing={4}>
                        <Grid item xs={1}>
                            <Avatar className={classes.profilePic}>BQ</Avatar>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="h6" component="h2">
                                Biqian Cheng
                            </Typography>
                            <Typography variant="body2" component="p">
                                Univerist of California, Riverside
                            </Typography>
                            <Typography variant="body2" component="p">
                                BCOE Department
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Paper className={classes.descriptionPaper}></Paper>
                        </Grid>
                        <Grid item xs={4}>
                            <Paper className={classes.middlePaper}>
                                <List>
                                    {[
                                        "CS171",
                                        "CS180",
                                        "CS165",
                                        // "CS105",
                                        // "CS100",
                                        // "CS061",
                                        // "CS235",
                                    ].map((item) => {
                                        return (
                                            <ListItem>
                                                <ListItemText primary={item} />
                                            </ListItem>
                                        );
                                    })}
                                </List>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}
                                >
                                    Add
                                </Button>
                            </Paper>
                        </Grid>
                        <Grid item xs={4}>
                            <Paper className={classes.middlePaper}>
                                <Typography variant="h6" component="h2">
                                    Resume/CV
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={4}>
                            <Paper className={classes.middlePaper}>
                                <Typography variant="h6" component="h2">
                                    Transcript
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper className={classes.middlePaper}></Paper>
                        </Grid>
                    </Grid>
                    <Grid item xs={2}></Grid>
                </Grid>
                <Button
                    size="medium"
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                >
                    Update
                </Button>
            </Container>
        </>
    );
}
export default ProfilePage;
