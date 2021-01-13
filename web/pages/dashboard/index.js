import React, { createRef, useEffect, useRef, useState } from "react";
import styles from "../../styles/pages/Dashboard.module.css";
import NavBar from "../../components/NavBar";
import ProfileDrawer from "../../components/ProfileDrawer";
import JobCard from "../../components/JobCard";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  createMuiTheme,
  Grid,
  Paper,
  ThemeProvider,
  Typography,
} from "@material-ui/core";

import axios from "axios";

import { useRouter } from "next/router";



export default function DashBoard({ userInfo }) {
  const router = useRouter();
  const [logedIn, setLogedIn] = useState(true);
  const [jobData, setJobData] = useState();

  const childRef = createRef();

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
      window.localStorage.removeItem("token");
    }
    router.push("/");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.getItem("token")
        ? setLogedIn(true)
        : setLogedIn(false);
      axios
        .get("http://localhost:8000/api/job", {
          headers: {
            Authorization: `JWT ${localStorage.getItem("token")}`,
          },
        })
        .then((r) => {
          console.log(r);
          setJobData(r.data);
        })
        .catch((e) => {
          console.log(e.response);
        });
    }

    if (!logedIn) {
      router.push("/login");
    }
  }, []);

  return (
    <>
      <NavBar
        toggleDrawer={childRef.toggleDrawer}
        handleLogout={handleLogout}
        jobData={jobData}
        setJobData={setJobData}
      />

      <Container maxWidth="xl">
        <Typography
          variant="h2"
          component="h2"
          gutterBottom
          className={styles.greetingTitle}
        >
          Good {checkGreeting()}!
        </Typography>

        <Grid
          container
          justify="center"
          spacing={5}
          className={styles.cardContainer}
        >
          <Grid item xs={12}>
            <Typography variant="h4" component="h2" gutterBottom>
              Available Jobs
            </Typography>
          </Grid>
          {jobData !== undefined ? (
            jobData.map((item) => {
              console.log;
              return (
                <JobCard
                  name={item.name}
                  description={item.description}
                  poster={item.poster}
                />
              );
            })
          ) : (
            <></>
          )}

          <Grid item xs={12} style={{ paddingTop: "15rem" }}>
            <Typography variant="h4" component="h2" gutterBottom>
              Pending Jobs
            </Typography>
          </Grid>
          {[
            {
              name: "Undergruate Research",
              description:
                "Looking for eager CS / CE / CSBA students looking to get involved in my Machine Learning Lab",
              poster: "John Huh",
            },
            {
              name: "Undergruate Research",
              description:
                "Looking for eager CS / CE / CSBA students looking to get involved in my Machine Learning Lab",
              poster: "John Huh",
            },
            {
              name: "Undergruate Research",
              description:
                "Looking for eager CS / CE / CSBA students looking to get involved in my Machine Learning Lab",
              poster: "John Huh",
            },
          ].map((item) => {
            return (
              <JobCard
                name={item.name}
                description={item.description}
                poster={item.poster}
              />
            );
          })}
          {/* <JobCard
                name={"Undergruate Research"}
                description={"Looking for eager CS / CE / CSBA students looking to get involved in my Machine Learning Lab"}
                poster={"John Huh"}
              /> */}
        </Grid>
      </Container>
    </>
  );
}
