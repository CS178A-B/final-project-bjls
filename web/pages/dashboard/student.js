import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/pages/Dashboard.module.css";
import NavBar from "../../components/NavBar";
import JobCard from "../../components/JobCard";
import JobSingleLineList from "../../components/JobSingleLineList";
import {
    CircularProgress,
    Container,
    Grid,
    Typography,
} from "@material-ui/core";

import ApplyJobPopover from "../../components/ApplyJobPopover";
import mockdata from "../../src/MockJob";

import axios from "axios";

import { useRouter } from "next/router";

export default function DashBoard() {
    const router = useRouter();
    const [jobData, setJobData] = useState();
    const [userInfo, setUserInfo] = useState();

    // Popover
    const [anchorEl, setAnchorEl] = useState(null);
    const [popoverId, setPopoverId] = useState(null);

    const handleApplyClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleApplyClose = () => {
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
            router.push("/login");
        }
        axios
            .get("http://localhost:8000/api/current_user", {
                headers: {
                    Authorization: `JWT ${localStorage.getItem("tokenS")}`,
                },
            })
            .then((r) => {
                console.log(r);
                setUserInfo(r.data.user);
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
                    <Grid item xs={12} style={{ paddingTop: "15rem" }}>
                        <Typography variant="h4" component="h2" gutterBottom>
                            All Available Jobs
                        </Typography>
                    </Grid>

                    {jobData ? (
                        jobData.map((item, index) => {
                            return (
                                <>
                                    <Grid item xs={4}>
                                        <JobCard
                                            name={item.name}
                                            description={item.description}
                                            poster={item.poster}
                                            handleApplyClick={handleApplyClick}
                                        />
                                        <ApplyJobPopover
                                            data={item}
                                            anchorEl={anchorEl}
                                            handleClose={handleApplyClose}
                                        />
                                    </Grid>
                                </>
                            );
                        })
                    ) : (
                        <CircularProgress />
                    )}
                </Grid>
            </Container>
        </>
    );
}
