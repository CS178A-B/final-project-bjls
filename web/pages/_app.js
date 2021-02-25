import "../styles/globals.css";
import Head from "next/head";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import theme from "../src/theme.js";
import { SnackbarProvider } from "notistack";

function MyApp({ Component, pageProps }) {
    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector("#jss-server-side");
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <>
            <ThemeProvider theme={theme}>
                <SnackbarProvider maxSnack={3}>
                    <Head>
                        {/* <meta charset="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta httpEquiv="X-UA-Compatible" content="ie=edge" /> */}
                        <title>Reader Matching Tool</title>
                    </Head>
                    {/* CssBaseline kickstart an elegant, consistent, 
        and simple baseline to build upon. */}
                    <CssBaseline />
                    <Component {...pageProps} />
                </SnackbarProvider>
            </ThemeProvider>
        </>
    );
}

export default MyApp;
