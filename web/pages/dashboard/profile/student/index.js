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
import React, { useEffect, useState } from "react";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Dropzone from "react-dropzone";
import { useSnackbar } from "notistack";
import NavBar from "../../../../components/NavBar";

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
    console.log(title);
    console.log(description);
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
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [resumePDF, setResumePDF] = useState();
    const [transcriptPDF, setTranscriptPDF] = useState();
    const classes = useStyles();
    const [userInfo, setUserInfo] = useState({
        firstname: "NaN",
        lastname: "NaN",
        major: "NaN",
        department: "BCOE",
        school: "University of California, Riverside",
        gpa: "NaN",
        expDate: "",
        description: "",
        courses: [
            "CS171",
            "CS180",
            "CS165",
            "CS105",
            "CS100",
            "CS061",
            "CS235",
        ],
        comments: [
            { course: "CS111", comment: "Good Grader" },
            { course: "CS105", comment: "Awesome Grader" },
            { course: "CS171", comment: "HAHA you are good" },
        ],
    });
    const [updateState, setUpdateState] = useState(false);

    useEffect(() => {
        if (userData) {
            setUserInfo(userData);
        }
    }, [userData]);
    return (
        <>
            <NavBar identity="student" />
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

                            {updateState ? (
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="School"
                                    value={userInfo.school}
                                    onChange={(e) => {
                                        setUserInfo({
                                            ...userInfo,
                                            school: e.target.value,
                                        });
                                    }}
                                ></TextField>
                            ) : (
                                <Typography variant="body2" component="p">
                                    {userInfo.school}
                                </Typography>
                            )}

                            {updateState ? (
                                <TextField
                                    size="small"
                                    fullWidth
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

                            {updateState ? (
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="GPA"
                                    value={userInfo.gpa}
                                    onChange={(e) => {
                                        setUserInfo({
                                            ...userInfo,
                                            gpa: e.target.value,
                                        });
                                    }}
                                ></TextField>
                            ) : (
                                <Typography variant="body2" component="p">
                                    GPA: {userInfo.gpa}
                                </Typography>
                            )}
                            {updateState ? (
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Expcted dates"
                                    value={userInfo.expDate}
                                    onChange={(e) => {
                                        setUserInfo({
                                            ...userInfo,
                                            expDate: e.target.value,
                                        });
                                    }}
                                ></TextField>
                            ) : (
                                <Typography variant="body2" component="p">
                                    Expected graduate dates: {userInfo.expDate}
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
                                        {userInfo ? (
                                            userInfo.courses.map((item) => {
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
                        <Grid item xs={4}>
                            <Paper className={classes.middlePaper}>
                                <Typography variant="h6" component="h2">
                                    Resume/CV
                                </Typography>
                                <Dropzone accept={"image/*, .pdf"}>
                                    {({
                                        acceptedFiles,
                                        getRootProps,
                                        getInputProps,
                                    }) => (
                                        <div {...getRootProps({})}>
                                            <input {...getInputProps()} />
                                            {acceptedFiles.length !== 0 ? (
                                                setResumePDF(acceptedFiles[0])
                                            ) : (
                                                <></>
                                            )}
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
                                                    {resumePDF
                                                        ? resumePDF.path
                                                        : "Drop some files here, or click to select files"}
                                                </Typography>
                                            </Paper>
                                        </div>
                                    )}
                                </Dropzone>
                                {resumePDF ? (
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        className={classes.middlePaperButton}
                                    >
                                        Upload
                                    </Button>
                                ) : (
                                    <></>
                                )}
                            </Paper>
                        </Grid>
                        <Grid item xs={4}>
                            <Paper className={classes.middlePaper}>
                                <Typography variant="h6" component="h2">
                                    Transcript
                                </Typography>
                                <Dropzone accept={"image/*, .pdf"}>
                                    {({
                                        acceptedFiles,
                                        getRootProps,
                                        getInputProps,
                                    }) => (
                                        <div {...getRootProps({})}>
                                            <input {...getInputProps()} />
                                            {acceptedFiles.length !== 0 ? (
                                                setTranscriptPDF(
                                                    acceptedFiles[0]
                                                )
                                            ) : (
                                                <></>
                                            )}
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
                                                    {transcriptPDF
                                                        ? transcriptPDF.path
                                                        : "Drop some files here, or click to select files"}
                                                </Typography>
                                            </Paper>
                                        </div>
                                    )}
                                </Dropzone>
                                {transcriptPDF ? (
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        className={classes.middlePaperButton}
                                    >
                                        Upload
                                    </Button>
                                ) : (
                                    <></>
                                )}
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper className={classes.middlePaper}>
                                <Typography variant="h6" component="h2">
                                    Comments:
                                </Typography>
                                <div className={classes.middlePaperPlaceholder}>
                                    {userInfo ? (
                                        userInfo.comments.map((item, index) => {
                                            <Accordion>
                                                <AccordionSummary
                                                    expandIcon={
                                                        <ExpandMoreIcon />
                                                    }
                                                    aria-controls={index}
                                                    id={index + item.course}
                                                >
                                                    <Typography>
                                                        {item.course}
                                                    </Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Typography>
                                                        {item.comment}
                                                    </Typography>
                                                </AccordionDetails>
                                            </Accordion>;
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
                    </Grid>
                    <Grid item xs={2}></Grid>
                </Grid>
                <Button
                    size="medium"
                    variant="contained"
                    color={updateState ? "primary" : "secondary"}
                    className={classes.button}
                    onClick={() => {
                        setUpdateState(!updateState);
                        updateState
                            ? enqueueSnackbar("Update Successful", "success")
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
