import { useState } from 'react';
import { ToggleButton, FormControl } from '@mui/material';

const Toggle = ({ field, baseProps, element, setFieldValue }) => {
    const [value, setValue] = useState(Boolean(element));

    const handleChange = (event) => {
        const state = !value;
        setValue(state);
        setFieldValue(baseProps.name, state);
    };

    return (
        <FormControl
            margin='normal'
            fullWidth
        >
            <ToggleButton
                value='check'
                color='success'
                selected={value}
                onChange={handleChange}
                fullWidth
                sx={{
                    py: 1.8,
                    backgroundColor: !value && 'rgba(211, 47, 47, 0.08)',
                    color: !value && '#d32f2f',
                    '&:hover': {
                        backgroundColor: !value && 'rgba(211, 47, 47, 0.12)'
                    }
                }}
            >
                {value ? field.label : field.labelOnFalse || field.label}
            </ToggleButton>
        </FormControl>
    );
}

export default Toggle;