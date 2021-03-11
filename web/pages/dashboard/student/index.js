import React, { useEffect, useRef, useState } from "react";
import styles from "../../../styles/pages/Dashboard.module.css";
import NavBar from "../../../components/NavBar";
import JobCard from "../../../components/JobCard";
import JobSingleLineList from "../../../components/JobSingleLineList";
import {
    CircularProgress,
    Container,
    Grid,
    Typography,
} from "@material-ui/core";

import ApplyJobPopover from "../../../components/ApplyJobPopover";
import mockdata from "../../../src/MockJob";

import axios from "axios";

import { useRouter } from "next/router";

export default function DashBoard() {
    const router = useRouter();
    const [jobData, setJobData] = useState();
    const [userInfo, setUserInfo] = useState();

    // Popover
    const [anchorEl, setAnchorEl] = useState(null);
    const [popoverId, setPopoverId] = useState(null);

    const handleApplyClick = (event, index) => {
        setPopoverId(index);
        setAnchorEl(event.currentTarget);
    };
    const handleApplyClose = () => {
        setPopoverId(null);
        setAnchorEl(null);
    };

    const checkGreeting = () => {
        if (Date.now.getHours < 12) {
            return "Morning";
        } else if (Date.now.getHour < 18) {
            return "Afternoon";
        } else {
            return "Evening";
        }
    };

    const handleLogout = () => {
        if (typeof window !== "undefined") {
            window.localStorage.removeItem("tokenS");
        }
        router.push("/");
    };

    useEffect(() => {
        console.log("haha");
        if (!localStorage.getItem("tokenS")) {
            router.push("/login/student");
        }
        axios
            .get("http://localhost:8000/api/current_user", {
                headers: {
                    Authorization: `JWT ${localStorage.getItem("tokenS")}`,
                },
            })
            .then((r) => {
                console.log(r);
                setUserInfo(r.data);
            })
            .catch((e) => {
                console.log(e.response);
            });

        axios
            .get("http://localhost:8000/api/job", {
                headers: {
                    Authorization: `JWT ${localStorage.getItem("tokenS")}`,
                },
            })
            .then((r) => {
                console.log(r);
                setJobData(r.data);
                setJobData(mockdata);
            })
            .catch((e) => {
                console.log(e.response);
            });
        setJobData(mockdata);
    }, []);

    return (
        <>
            <NavBar
                userInfo={userInfo}
                handleLogout={handleLogout}
                jobData={jobData}
                setJobData={setJobData}
                identity="student"
            />

            <Container maxWidth="lg">
                <Typography
                    variant="h2"
                    component="h2"
                    gutterBottom
                    className={styles.greetingTitle}
                >
                    Good {checkGreeting()}!
                </Typography>

                <Typography variant="h4" component="h2" gutterBottom>
                    Recommended Jobs
                </Typography>
                {jobData ? (
                    <JobSingleLineList data={jobData} />
                ) : (
                    <CircularProgress style={{ marginLeft: "50%" }} />
                )}

                <Grid container justify="center" spacing={5}>
                    <Grid item xs={12} style={{ paddingTop: "5rem" }}>
                        <Typography variant="h4" component="h2" gutterBottom>
                            All Available Jobs
                        </Typography>
                    </Grid>

                    {jobData ? (
                        jobData.map((item, index) => {
                            return (
                                <Grid key={index} item xs={4}>
                                    <JobCard
                                        key={index}
                                        name={item.name}
                                        description={item.description}
                                        poster={item.poster}
                                        index={index}
                                        handleApplyClick={handleApplyClick}
                                    />
                                </Grid>
                            );
                        })
                    ) : (
                        <CircularProgress />
                    )}
                    {popoverId ? (
                        <ApplyJobPopover
                            data={jobData[popoverId]}
                            anchorEl={anchorEl}
                            handleClose={handleApplyClose}
                        />
                    ) : (
                        <></>
                    )}
                </Grid>
            </Container>
        </>
    );
}
