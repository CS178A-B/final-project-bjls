import React from "react";
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    Dialog,
    Divider,
    Grid,
    Typography,
} from "@material-ui/core";

const CheckApplicantsDialog = () => {
    return(
        <Dialog>
            
        </Dialog>
    )
};

const ApplicantCard = ({
    name,
    description,
    poster,
    setPostOpen,
    handlePopover,
    handlePopoverClose,
}) => {
    return (
        <React.Fragment>
            <Card>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {name}
                        </Typography>
                        <Divider />
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                        >
                            Description:
                        </Typography>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                        >
                            {description}
                        </Typography>

                        <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                        >
                            Poster: {poster}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        disableElevation
                        onClick={() => {
                            setPostOpen(true);
                        }}
                    >
                        Check Applicants
                    </Button>
                </CardActions>
            </Card>
        </React.Fragment>
    );
};

export default ApplicantCard;
