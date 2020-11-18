import Link from "next/link";
import styles from "../styles/components/NavBar.module.css";
import React from "react";
import { createMuiTheme, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#c1cc98",
        },
        secondary: {
            main: "#d2bdff",
            dark: "#a08dcc",
            light: "#fff0ff",
        },
    },
});

export default function NavBar() {
    return (
        <ThemeProvider theme={theme}>
            <div className={styles.root}>
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            className={styles.menuButton}
                            color="inherit"
                            aria-label="menu"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={styles.title}>
                            Dashboard
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </div>
        </ThemeProvider>
    );
}
