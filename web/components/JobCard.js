import React from "react";
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    Grid,
    Typography,
} from "@material-ui/core";

const JobCard = ({
    name,
    description,
    poster,
    index,
    handleApplyClick,
    handleDetailClick,
}) => {
    return (
        <React.Fragment>
            <Card>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {name}
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
                            {poster}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button
                        size="small"
                        color="secondary"
                        onClick={(event) => {
                            handleApplyClick(event, index);
                        }}
                    >
                        Apply
                    </Button>
                    <Button size="small" color="secondary">
                        Detail
                    </Button>
                </CardActions>
            </Card>
        </React.Fragment>
    );
};

export default JobCard;
