import React from "react";
import { Box } from '@mui/material';
import TimePicker from "./TimePicker";
import { getIn } from 'formik';

const TimeRangePicker = ({
    field,
    baseProps,
    setFieldValue,
    touched,
    errors
}) => {
    const startName =  baseProps.name + '.' + field.fields[0].name;
    const endName =  baseProps.name + '.' + field.fields[1].name;

    const startProps = {
        ...baseProps,
        fullWidth: false,
        name: startName,
        label: field.fields[0].label,
        error: Boolean(
            getIn(touched, startName) && getIn(errors, startName)
        ),
        value: baseProps.value[field.fields[0].name]
    }

    const endProps = {
        ...baseProps,
        fullWidth: false,
        name: endName,
        label: field.fields[1].label,
        error: Boolean(
            getIn(touched, startName) && getIn(errors, startName)
        ),
        value: baseProps.value[field.fields[1].name]
    }
    
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TimePicker
                baseProps={startProps}
                setFieldValue={setFieldValue}
            />
            <Box sx={{ mx: 2 }}> - </Box>
            <TimePicker
                baseProps={endProps}
                setFieldValue={setFieldValue}
            />
        </Box>
    );
}

export default TimeRangePicker;