import { Link as RouterLink } from 'react-router-dom';
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Grid,
    Typography,
    Button
} from '@mui/material';
import CountUp from 'react-countup';
import ArrowForward from '@mui/icons-material/ArrowForward';

const DashboardCard = ({ title, value, url, ...otherProps }) => {
    const { icon: Icon } = otherProps;

    return (

        <Card
            sx={{ height: '100%' }}
        >
            <CardContent
                sx={{
                    paddingBottom: '5px !important'
                }}
            >
                <Grid
                    container
                    spacing={3}
                    sx={{
                        justifyContent: 'left'
                    }}
                >
                    <Grid item>
                        <Avatar
                            sx={{
                                backgroundColor: 'primary.main',
                                height: 60,
                                width: 60
                            }}
                        >
                            <Icon style={{ fontSize: '35px' }} />
                        </Avatar>
                    </Grid>
                </Grid>
                <Box sx={{
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    mb: 2
                }}>
                    <Typography
                        color='#ff7701'
                        gutterBottom
                        variant='h4'
                    >
                        {title}
                    </Typography>
                    <Typography
                        color='textPrimary'
                        variant='h3'
                    >
                        <CountUp end={value} />
                    </Typography>
                </Box>
                <Box
                    sx={{
                        pt: 2,
                        textAlign: 'right'
                    }}
                >
                    <Button endIcon={<ArrowForward />} component={RouterLink} to={url}>
                        Виж повече
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}

export default DashboardCard;
