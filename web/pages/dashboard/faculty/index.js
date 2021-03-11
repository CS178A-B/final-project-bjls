import React, { createRef, useEffect, useRef, useState } from "react";
import styles from "../../../styles/pages/Dashboard.module.css";
import NavBar from "../../../components/NavBar";
import ApplicantCard from "../../../components/ApplicantCard";
import {
    CircularProgress,
    Container,
    Grid,
    Typography,
} from "@material-ui/core";

// import ApplyPopover from "../../components/ApplyPopover";
import mockdata from "../../../src/MockJob";
import PostJobDialog from "../../../components/PostJobDialog";
import axios from "axios";

import { useRouter } from "next/router";

export default function DashBoard({ userInfo }) {
    const router = useRouter();
    const [logedIn, setLogedIn] = useState(true);
    const [jobData, setJobData] = useState();
    // const [postOpen, setPostOpen] = useState(false);

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
        setLogedIn(false);
        if (typeof window !== "undefined") {
            window.localStorage.removeItem("tokenF");
        }
        router.push("/");
    };

    useEffect(() => {
        window.localStorage.getItem("tokenF")
            ? setLogedIn(true)
            : setLogedIn(false);
        axios
            .get("http://localhost:8000/api/job", {
                headers: {
                    Authorization: `JWT ${localStorage.getItem("tokenF")}`,
                },
            })
            .then((r) => {
                console.log(r);
                setJobData(r.data);
                setJobData(mockdata);
            })
            .catch((e) => {
                console.log(e.response);
                setJobData(mockdata);
            });

        if (!logedIn) {
            router.push("/login/faculty");
        }
    }, []);

    return (
        <>
            <NavBar
                handleLogout={handleLogout}
                jobData={jobData}
                setJobData={setJobData}
                identity="faculty"
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
                <Grid container justify="center" spacing={5}>
                    <Grid item xs={12}>
                        <Typography variant="h4" component="h2" gutterBottom>
                            All Available Jobs
                        </Typography>
                    </Grid>
                    {jobData ? (
                        jobData.map((item) => {
                            return (
                                <Grid item xs={4}>
                                    {/* <ApplyPopover ref={ref} /> */}
                                    <ApplicantCard
                                        name={item.name}
                                        description={item.description}
                                        poster={item.poster}

                                        // handlePopover={ref.current.handleClick}
                                        // handlePopoverClose={ref.current.handleClose}
                                    />
                                </Grid>
                            );
                        })
                    ) : (
                        <CircularProgress />
                    )}
                </Grid>

                {/* <JobCard
                name={"Undergruate Research"}
                description={"Looking for eager CS / CE / CSBA students looking to get involved in my Machine Learning Lab"}
                poster={"John Huh"}
              /> */}
            </Container>
        </>
    );
}
