import {
    Card,
    CardContent,
    Avatar,
    Box,
    Typography,
    Button,
    Stack
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import PropTypes from 'prop-types';

const AcceptanceCard = ({ data, onAccept, onReject }) => {
    const { icon: Icon } = data;

    return (
        <Card sx={{ display: 'flex', py: 5, px: 8, alignItems: 'center', justifyContent: 'space-between' }}>
            <CardContent sx={{ display: 'flex', p: 0, alignItems: 'center', gap: '50px' }}>
                <Avatar
                    sx={{
                        height: 100,
                        width: 100
                    }}
                >
                    <Icon sx={{ fontSize: 40 }}/>
                </Avatar>
                <Box>
                    <Typography component="div" variant="h3">
                        {data.title}
                    </Typography>
                    <Typography component="div" variant="p">
                        {data.subtitle}
                    </Typography>
                </Box>
            </CardContent>
            <Box>
                <Stack direction="row" spacing={2}>
                    <Button variant="outlined" startIcon={<ClearIcon />} color="error" onClick={() => onReject(data.id)}>
                        Откажи
                    </Button>
                    <Button variant="contained" startIcon={<CheckIcon />} color="lightBlue" onClick={() => onAccept(data.id)}>
                        Приеми
                    </Button>
                </Stack>
            </Box>
        </Card>
    );
}

AcceptanceCard.propTypes = {
    data: PropTypes.object.isRequired,
    onAccept: PropTypes.func.isRequired,
    onReject: PropTypes.func.isRequired
};

export default AcceptanceCard;