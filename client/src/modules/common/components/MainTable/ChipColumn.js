import { useState } from 'react';
import {
    Tooltip,
    Chip,
    Select,
    MenuItem
} from '@mui/material';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const ChipColumn = ({ value, select, options, handler, newRequest, row }) => {
    const [open, setOpen] = useState(false);

    const handleChange = (event) => {
        handler(event.target.value, row.id);
        newRequest();
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <div>
            {select ? (
                <>
                    <Tooltip title={value || 'Избери'}>
                        <Chip
                            label={value || 'Избери'}
                            onDelete={handleOpen}
                            deleteIcon={<ArrowDropDownIcon />}
                            sx={{ maxWidth: '150px' }}
                        />
                    </Tooltip>
                    <Select
                        value={''}
                        open={open}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        onChange={handleChange}
                        sx={{ visibility: 'hidden', width: 0, height: 0 }}
                    >
                        {options.map((el, index) => (
                            <MenuItem key={index} value={el.value}>{el.label}</MenuItem>
                        ))}
                    </Select>
                </>
            ) : (
                <Tooltip title={value}>
                    <Chip
                        label={value}
                        sx={{ maxWidth: '150px' }}
                    />
                </Tooltip>
            )}
        </div>
    );
}

export default ChipColumn;