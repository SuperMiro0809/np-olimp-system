import {
    FormControl,
    InputLabel,
    Select as SelectMUI,
    MenuItem
} from '@mui/material';
import PropTypes from 'prop-types';

const Select = ({ title, options, value, setValue, fullWidth = false, size = 'medium' }) => {

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    return (
        <FormControl fullWidth={fullWidth} size={size}>
            <InputLabel id="label">{title}</InputLabel>
            <SelectMUI
                labelId="label"
                hidden
                value={value}
                label={title}
                onChange={handleChange}
                sx={{ backgroundColor: 'white' }}
            >
                {options.map((option, index) => (
                    <MenuItem value={option.value} key={index}>{option.label}</MenuItem>
                ))}
            </SelectMUI>
        </FormControl>
    );
};

Select.propTypes = {
    title: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    setValue: PropTypes.func.isRequired,
    fullWidth: PropTypes.bool,
    size: PropTypes.string
}

export default Select;