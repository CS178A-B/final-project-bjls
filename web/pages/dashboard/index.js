import React from "react";
import styles from "../../styles/pages/Dashboard.module.css";
import NavBar from "../../components/NavBar";
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

const JobCard = () => {
    const theme = createMuiTheme({
        palette: {
            primary: {
                main: "#a08dcc",
            },
        },
    });

    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
                <Grid item xs={4}>
                    <Card className={styles.jobCard}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                alt="jobcard"
                                height="140"
                                image=""
                                title="JobCard"
                            />
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="h2"
                                >
                                    Ex veniam consectetur
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    component="p"
                                >
                                    Reprehenderit incididunt sit occaecat
                                    proident Lorem reprehenderit in. Excepteur
                                    irure fugiat amet est sit. Elit Lorem eu
                                    fugiat incididunt ut eu sint. Nulla officia
                                    consectetur dolor qui labore exercitation.
                                    Laboris adipisicing nisi officia ut mollit
                                    cupidatat minim enim nisi est minim elit ex.
                                    Mollit ea sit elit eiusmod eiusmod eiusmod
                                    eiusmod sint veniam voluptate aliqua magna
                                    commodo officia.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary">
                                Apply
                            </Button>
                            <Button size="small" color="primary">
                                Detail
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </ThemeProvider>
        </React.Fragment>
    );
};

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
                    {[1, 2, 3, 4, 5].map(() => {
                        return <JobCard />;
                    })}

                    <Grid item xs={12} style={{ paddingTop: "15rem" }}>
                        <Typography variant="h4" component="h2" gutterBottom>
                            Pending Jobs
                        </Typography>
                    </Grid>
                    {[1, 2, 3, 4, 5].map(() => {
                        return <JobCard />;
                    })}
                </Grid>
            </Container>
        </>
    );
}
