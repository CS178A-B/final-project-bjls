import { Container, Typography } from "@material-ui/core";
import Link from "next/link";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";

const Slider = () => {
    return (
        <Carousel>
            <Carousel.Item interval={2300}>
                <img
                    className="d-block w-100"
                    src="https://ucrtoday.ucr.edu/wp-content/uploads/2015/10/UCR-sign-artsbldg.jpg"
                    alt="Third slide"
                    style={{ maxWidth: "100vw", maxHeight: "100vh" }}
                />
                <Carousel.Caption>
                    <Typography
                        style={{ paddingBottom: "25rem" }}
                        variant="h2"
                        component="h1"
                        gutterBottom
                    >
                        Welcome to R'Finder!
                    </Typography>
                    <Typography
                        style={{ paddingBottom: "8rem" }}
                        variant="h3"
                        component="h3"
                        gutterBottom
                    >
                        We are here to help you building connection between
                        faculty members and potential Readers at UCR!
                    </Typography>
                    <Link href="/login" passHref>
                        <Button
                            variant="contained"
                            color="Secondary"
                            component="a"
                        >
                            Click here to log in
                        </Button>
                    </Link>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={2600}>
                <img
                    className="d-block w-100"
                    src="https://a.scpr.org/i/41cb598a2283191f11d4e5f6632c353c/36303-full.jpg"
                    alt="first slide"
                    style={{ maxWidth: "100vw", maxHeight: "100vh" }}
                />
                <Carousel.Caption>
                    <Typography
                        style={{ paddingBottom: "25rem" }}
                        variant="h2"
                        component="h2"
                        gutterBottom
                    >
                        Welcome to R'Finder!
                    </Typography>
                    <Typography
                        style={{ paddingBottom: "8rem" }}
                        variant="h3"
                        component="h3"
                        gutterBottom
                    >
                        We are here to help you building connection between
                        faculty members and potential Readers at UCR!
                    </Typography>
                    <Link href="/login" passHref>
                        <Button
                            variant="contained"
                            color="Secondary"
                            component="a"
                        >
                            Click here to log in
                        </Button>
                    </Link>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={2600}>
                <img
                    className="d-block w-100"
                    src="https://ucrtoday.ucr.edu/wp-content/uploads/2018/05/ucrsign.jpg"
                    alt="Second slide"
                    style={{ maxWidth: "100vw", maxHeight: "100vh" }}
                />
                <Carousel.Caption>
                    <Typography
                        style={{ paddingBottom: "25rem", color: "Black" }}
                        variant="h2"
                        component="h2"
                        gutterBottom
                    >
                        Welcome to R'Finder!
                    </Typography>
                    <Typography
                        style={{ paddingBottom: "8rem" }}
                        variant="h3"
                        component="h3"
                        gutterBottom
                    >
                        We are here to help you building connection between
                        faculty members and potential Readers at UCR!
                    </Typography>
                    <Link href="/login" passHref>
                        <Button
                            variant="contained"
                            color="Secondary"
                            component="a"
                        >
                            Click here to log in
                        </Button>
                    </Link>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function ButtonAppBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Slider />
        </div>
    );
}
