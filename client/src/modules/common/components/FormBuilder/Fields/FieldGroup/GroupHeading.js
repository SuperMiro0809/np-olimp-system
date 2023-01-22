import { Box, Typography } from '@mui/material';

const GroupHeading = ({ title, variant }) => {
    return (
        <Box sx={{ mb: 1, mt: 2 }}>
            <Typography
                color="textPrimary"
                variant={variant}
            >
                {title}
            </Typography>
        </Box>
    );
}

export default GroupHeading;