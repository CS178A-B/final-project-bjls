import {
    Avatar,
    Box,
    Button,
    Container,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemText,
    makeStyles,
    Paper,
    TextField,
    Typography,
} from "@material-ui/core";
import Image from "next/image";
import React, { useState } from "react";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Dropzone from "react-dropzone";

import NavBar from "../../../components/NavBar";

const useStyles = makeStyles((theme) => ({
    banner: {
        position: "relative",
        width: "100vw",
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
        padding: theme.spacing(2),
    },
    middlePaper: {
        height: theme.spacing(40),
        padding: theme.spacing(3),
    },
    middlePaperButton: {
        margin: theme.spacing(1),
        float: "right",
    },
    middlePaperPlaceholder: {
        height: theme.spacing(25),
        overflow: "auto",
    },
    middlePaperDropZone: {
        height: theme.spacing(25),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        margin: theme.spacing(2),
        float: "right",
    },
}));

const CommentsItem = (title, description) => {
    return (
        <React.Fragment>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>{title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>{description}</Typography>
                </AccordionDetails>
            </Accordion>
        </React.Fragment>
    );
};

function ProfilePage(props) {
    const classes = useStyles();
    const [userData, setUserData] = useState();
    const [updateState, setUpdateState] = useState(false);
    return (
        <>
            <NavBar />
            <div className={classes.banner}>
                <Image
                    src="/images/ucrBanner.png"
                    alt="ucr_banner"
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <Container maxWidth="xl">
                <Grid container spacing={5}>
                    <Grid container item xs={10} spacing={4}>
                        <Grid item xs={1}>
                            <Avatar className={classes.profilePic}>BQ</Avatar>
                        </Grid>
                        <Grid item xs={3}>
                            {updateState ? (
                                <TextField
                                    size="small"
                                    label="Name"
                                ></TextField>
                            ) : (
                                <Typography variant="h6" component="h2">
                                    Biqian Cheng
                                </Typography>
                            )}

                            {updateState ? (
                                <TextField
                                    size="small"
                                    label="School"
                                ></TextField>
                            ) : (
                                <Typography variant="body2" component="p">
                                    Univerist of California, Riverside
                                </Typography>
                            )}

                            {updateState ? (
                                <TextField
                                    size="small"
                                    label="Department"
                                ></TextField>
                            ) : (
                                <Typography variant="body2" component="p">
                                    BCOE Department
                                </Typography>
                            )}

                            {updateState ? (
                                <TextField size="small" label="GPA"></TextField>
                            ) : (
                                <Typography variant="body2" component="p">
                                    GPA: 3.83
                                </Typography>
                            )}
                            {updateState ? (
                                <TextField
                                    size="small"
                                    label="Expcted dates"
                                ></TextField>
                            ) : (
                                <Typography variant="body2" component="p">
                                    Expected graduate dates: June 2021
                                </Typography>
                            )}
                        </Grid>
                        <Grid item xs={8}>
                            <Paper className={classes.descriptionPaper}>
                                <Typography variant="body2" component="p">
                                    Description: Lorem Ipsum
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={4}>
                            <Paper className={classes.middlePaper}>
                                <Typography variant="h6" component="h2">
                                    Class List
                                </Typography>
                                <Box>
                                    <List
                                        className={
                                            classes.middlePaperPlaceholder
                                        }
                                    >
                                        {[
                                            "CS171",
                                            "CS180",
                                            "CS165",
                                            "CS105",
                                            "CS100",
                                            "CS061",
                                            "CS235",
                                        ].map((item) => {
                                            return (
                                                <React.Fragment>
                                                    <ListItem>
                                                        <ListItemText
                                                            primary={item}
                                                        />
                                                    </ListItem>
                                                    <Divider />
                                                </React.Fragment>
                                            );
                                        })}
                                    </List>
                                </Box>

                                <Button
                                    variant="contained"
                                    color="secondary"
                                    className={classes.middlePaperButton}
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
                                <Dropzone
                                    onDrop={(acceptedFiles) =>
                                        console.log(acceptedFiles)
                                    }
                                >
                                    {({ getRootProps, getInputProps }) => (
                                        <section>
                                            <div {...getRootProps()}>
                                                <input {...getInputProps()} />
                                                <Paper>
                                                    <Typography
                                                        className={
                                                            classes.middlePaperDropZone
                                                        }
                                                        variant="body2"
                                                        color="textSecondary"
                                                        component="h2"
                                                        gutterBottom
                                                    >
                                                        Drop some files here, or
                                                        click to select files
                                                    </Typography>
                                                </Paper>
                                            </div>
                                        </section>
                                    )}
                                </Dropzone>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    className={classes.middlePaperButton}
                                >
                                    Upload
                                </Button>
                            </Paper>
                        </Grid>
                        <Grid item xs={4}>
                            <Paper className={classes.middlePaper}>
                                <Typography variant="h6" component="h2">
                                    Transcript
                                </Typography>
                                <Dropzone
                                    onDrop={(acceptedFiles) =>
                                        console.log(acceptedFiles)
                                    }
                                >
                                    {({ getRootProps, getInputProps }) => (
                                        <section>
                                            <div {...getRootProps()}>
                                                <input {...getInputProps()} />
                                                <Paper>
                                                    <Typography
                                                        className={
                                                            classes.middlePaperDropZone
                                                        }
                                                        variant="body2"
                                                        color="textSecondary"
                                                        component="h2"
                                                        gutterBottom
                                                    >
                                                        Drop some files here, or
                                                        click to select files
                                                    </Typography>
                                                </Paper>
                                            </div>
                                        </section>
                                    )}
                                </Dropzone>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    className={classes.middlePaperButton}
                                >
                                    Upload
                                </Button>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper className={classes.middlePaper}>
                                <Typography variant="h6" component="h2">
                                    Comments:
                                </Typography>
                                <div className={classes.middlePaperPlaceholder}>
                                    {CommentsItem("CS111", "Good Grader")}
                                    {CommentsItem("CS105", "Awesome Grader")}
                                    {CommentsItem("CS171", "HAHA you are good")}
                                </div>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid item xs={2}></Grid>
                </Grid>
                <Button
                    size="medium"
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    onClick={() => {
                        setUpdateState(!updateState);
                    }}
                >
                    Update
                </Button>
            </Container>
        </>
    );
}
export default ProfilePage;
