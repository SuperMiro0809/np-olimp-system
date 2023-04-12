import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const AddFab = ({
    color = 'primary',
    size = 'small',
    sx = {},
    handler = () => { }
}) => {
    return (
        <Fab
            color={color}
            aria-label='add'
            size={size}
            sx={sx}
            onClick={handler}
        >
            <AddIcon />
        </Fab>
    );
}

export default AddFab;