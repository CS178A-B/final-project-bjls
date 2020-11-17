import React from "react";
import styles from "../../styles/pages/Dashboard.module.css";
import NavBar from "../../components/NavBar";
import { Container, Typography } from "@material-ui/core";

export default function DashBoard() {
    const checkGreeting = () => {
        if (Date.now.getHours < 12) {
            return "Morning";
        } else if (Date.now.getHour < 18) {
            return "Afternoon";
        } else {
            return "Evening";
        }
    };

    return (
        <>
            <NavBar />
            <Container maxWidth="lg">
                <Typography
                    variant="h1"
                    component="h2"
                    gutterBottom
                    className={styles.greetingTitle}
                >
                    Good {checkGreeting()}!
                </Typography>
            </Container>
        </>
    );
}
