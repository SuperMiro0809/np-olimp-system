import {
    Avatar,
    Box,
    Card,
    CardContent,
    Divider,
    Typography
} from '@mui/material';
import useAuth from '@modules/common/hooks/useAuth';

const formatRole = (role) => {
    if (role === 'SuperAdmin') {
        return 'МОН администратор';
    } else if (role === 'Admin') {
        return 'РУО администратор';
    } else if (role === 'Moderator') {
        return 'Училищен администратор';
    } else if (role === 'User') {
        return 'Учител';
    }
}

const AccountProfile = (props) => {
    const { user } = useAuth();

    return (
        <Card {...props}>
            <CardContent>
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Avatar
                        src={''}
                        sx={{
                            height: 100,
                            width: 100
                        }}
                    />
                    <Typography
                        color='textPrimary'
                        gutterBottom
                        variant='h3'
                    >
                        {user && user.info.name}
                    </Typography>
                    <Typography
                        color='textSecondary'
                        variant='body1'
                    >
                        {user && formatRole(user.role.name)}
                    </Typography>
                </Box>
            </CardContent>
            <Divider />
            {/* <CardActions>
                <Button
                    color="primary"
                    fullWidth
                    variant="text"
                >
                    Upload picture
                </Button>
            </CardActions> */}
        </Card>
    );
}

export default AccountProfile;
