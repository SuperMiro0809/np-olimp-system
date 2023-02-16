import { Switch, Typography } from '@mui/material';

const Toggle = ({ field, baseProps, element, setFieldValue }) => {

    const handleChange = (event) => {
        setFieldValue(baseProps.name, event.target.checked);
    };

    return (
        <>
            <Typography
                color="textPrimary"
                variant='h5'
            >
                {baseProps.label}
            </Typography>
            <Switch
                checked={Boolean(element)}
                onChange={handleChange}
            />
        </>
    );
}

export default Toggle;