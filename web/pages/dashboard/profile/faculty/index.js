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
    ListSubheader,
    makeStyles,
    Paper,
    TextField,
    Typography,
} from "@material-ui/core";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Dropzone from "react-dropzone";
import { useSnackbar } from "notistack";
import NavBar from "../../../../components/NavBar";
import { useRouter } from "next/router";

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
        height: theme.spacing(18),
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

// function StudentPage{{userData}}{

// }

function ProfilePage({ userData }) {
    const router = useRouter();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const classes = useStyles();
    const [userInfo, setUserInfo] = useState({
        firstname: "Shuang",
        lastname: "Zhou",
        department: "BCOE",
        school: "University of California, Riverside",
        gpa: "NaN",
        expDate: "",
        description: "",
        classes: [
            {
                year: "2017",
                term: "Spring",
                courses: ["CS178", "CS120A", "CS152"],
            },
            {
                year: "2018",
                term: "Winter",
                courses: ["CS150", "CS120B", "CS153"],
            },
        ],
        comments: [
            { course: "CS111", comment: "Good Grader" },
            { course: "CS105", comment: "Awesome Grader" },
            { course: "CS171", comment: "HAHA you are good" },
        ],
    });
    const [updateState, setUpdateState] = useState(false);

    const handleLogout = () => {
        if (typeof window !== "undefined") {
            window.localStorage.removeItem("tokenS");
        }
        router.push("/");
    };

    useEffect(() => {
        if (userData) {
            setUserInfo(userData);
        }
    }, [userData]);
    return (
        <>
            <NavBar handleLogout={handleLogout} identity="faculty" />
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
                    <Grid container item xs={12} spacing={4}>
                        <Grid item xs={1}>
                            <Avatar className={classes.profilePic} />
                        </Grid>
                        <Grid item xs={3}>
                            {updateState ? (
                                <div>
                                    <TextField
                                        style={{ padding: "8px" }}
                                        size="small"
                                        label="First Name"
                                        value={userInfo.firstname}
                                        onChange={(e) => {
                                            setUserInfo({
                                                ...userInfo,
                                                firstname: e.target.value,
                                            });
                                        }}
                                    ></TextField>
                                    <TextField
                                        style={{ padding: "8px" }}
                                        size="small"
                                        label="Last Name"
                                        value={userInfo.lastname}
                                        onChange={(e) => {
                                            setUserInfo({
                                                ...userInfo,
                                                lastname: e.target.value,
                                            });
                                        }}
                                    ></TextField>
                                </div>
                            ) : (
                                <Typography variant="h6" component="h2">
                                    {userInfo
                                        ? userInfo.firstname +
                                          " " +
                                          userInfo.lastname
                                        : "NaN"}
                                </Typography>
                            )}

                            <Typography variant="body2" component="p">
                                University of California, Riverside
                            </Typography>

                            {updateState ? (
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Department"
                                    value={userInfo.department}
                                    onChange={(e) => {
                                        setUserInfo({
                                            ...userInfo,
                                            department: e.target.value,
                                        });
                                    }}
                                ></TextField>
                            ) : (
                                <Typography variant="body2" component="p">
                                    Department: {userInfo.department}
                                </Typography>
                            )}
                        </Grid>
                        <Grid item xs={8}>
                            {updateState ? (
                                <Paper className={classes.descriptionPaper}>
                                    <TextField
                                        fullWidth
                                        multiline
                                        rows={4}
                                        variant="filled"
                                        label="Description"
                                        value={userInfo.description}
                                        onChange={(e) => {
                                            setUserInfo({
                                                ...userInfo,
                                                description: e.target.value,
                                            });
                                        }}
                                    ></TextField>
                                </Paper>
                            ) : (
                                <Paper className={classes.descriptionPaper}>
                                    <Typography
                                        variant="body2"
                                        component="p"
                                        value={userInfo.description}
                                        onChange={(e) => {
                                            setUserInfo({
                                                ...userInfo,
                                                description: e.target.value,
                                            });
                                        }}
                                    >
                                        Description: {userInfo.description}
                                    </Typography>
                                </Paper>
                            )}
                        </Grid>
                        <Grid item xs={8}>
                            <Paper className={classes.middlePaper}>
                                <Typography variant="h6" component="h2">
                                    Comments:
                                </Typography>
                                <div className={classes.middlePaperPlaceholder}>
                                    {userInfo ? (
                                        userInfo.comments.map((item) => {
                                            CommentsItem(
                                                item.course,
                                                item.comment
                                            );
                                        })
                                    ) : (
                                        <Typography
                                            variant="body1"
                                            component="h2"
                                        >
                                            Emptiness
                                        </Typography>
                                    )}
                                </div>
                            </Paper>
                        </Grid>
                        <Grid item xs={4}>
                            <Paper className={classes.middlePaper}>
                                <Typography variant="h6" component="h2">
                                    Instructing Classes
                                </Typography>
                                <Box>
                                    <List
                                        className={
                                            classes.middlePaperPlaceholder
                                        }
                                    >
                                        {userInfo ? (
                                            userInfo.classes.map((item) => {
                                                return (
                                                    <React.Fragment>
                                                        <ListSubheader>{`${item.year} ${item.term}`}</ListSubheader>
                                                        <ListItem>
                                                            {item.courses.map(
                                                                (innerItem) => {
                                                                    <ListItemText
                                                                        primary={`${innerItem}`}
                                                                    />;
                                                                }
                                                            )}
                                                        </ListItem>
                                                        <Divider />
                                                    </React.Fragment>
                                                );
                                            })
                                        ) : (
                                            <></>
                                        )}
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
                    </Grid>
                    <Grid item xs={2}></Grid>
                </Grid>
                <Button
                    size="medium"
                    variant="contained"
                    color={updateState ? "secondary" : "primary"}
                    className={classes.button}
                    onClick={() => {
                        setUpdateState(!updateState);
                        updateState
                            ? enqueueSnackbar("Update Successful", {
                                  variant: "success",
                              })
                            : {};
                    }}
                >
                    {updateState ? "Confirm" : "Update"}
                </Button>
            </Container>
        </>
    );
}
export default ProfilePage;
