import { FormGroup, FormControlLabel, Checkbox } from '@mui/material';

const CheckboxField = ({ field, setFieldValue }) => {
    const { options } = field;

    const handleClick = (event, option) => {
        setFieldValue(option, event.target.checked);
    }

    return (
        <FormGroup>
            {options.map((option, index) => (
                <FormControlLabel
                    label={option.label}
                    control={<Checkbox onClick={(event) => handleClick(event, option.value)}/>}
                    key={index}
                />
            ))}
        </FormGroup>
    );
};

export default CheckboxField;