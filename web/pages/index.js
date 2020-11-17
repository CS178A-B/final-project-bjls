import { Container, Typography } from "@material-ui/core";
import React from "react";
import NavBar from "../components/NavBar";
import styles from "../styles/pages/Home.module.css";

export default function Home() {
    return (
        <>
            <NavBar />
            <Container maxWidth="lg">
                <Typography variant="h1" component="h2" gutterBottom style={styles.greetingTitle}>
                    Good {}
                </Typography>
            </Container>
        </>
    );
}
