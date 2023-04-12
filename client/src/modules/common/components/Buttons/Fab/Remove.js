import { Fab } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';

const RemoveFab = ({
    color = 'error',
    size = 'small',
    sx = {},
    handler = () => { }
}) => {
    return (
        <Fab
            color={color}
            aria-label='remove'
            size={size}
            sx={sx}
            onClick={handler}
        >
            <RemoveIcon />
        </Fab>
    );
}

export default RemoveFab;