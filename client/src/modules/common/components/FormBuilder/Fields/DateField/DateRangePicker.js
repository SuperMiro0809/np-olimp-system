import React, { useState } from 'react';
import { Box, TextField } from '@mui/material';
import {
    //DateRangePicker as DateRangePickerMUI,
    LocalizationProvider
} from '@mui/x-date-pickers';
import { bg } from 'date-fns/locale';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { getIn } from 'formik';
import moment from 'moment';

const DateRangePicker = ({
    field,
    baseProps,
    setFieldValue,
    values,
    touched,
    errors
}) => {
    const { handleBlur, name, element = values[field.name] } = baseProps;

    const [date, setDate] = useState([element.startDate, element.endDate]);

    return (
        <LocalizationProvider locale={bg} dateAdapter={AdapterDateFns}>
            <DateRangePickerMUI
                startText="От"
                endText="До"
                value={date}
                onChange={(newValue) => {
                    setDate(newValue);
                    setFieldValue(`${name}.startDate`, moment(newValue[0]).format('YYYY/MM/DD'));
                    setFieldValue(`${name}.endDate`, moment(newValue[1]).format('YYYY/MM/DD'));
                }}
                renderInput={(startProps, endProps) => {
                    startProps.error = Boolean(
                        getIn(touched, `${name}.startDate`) &&
                        getIn(errors, `${name}.startDate`)
                    );
                    endProps.error = Boolean(
                        getIn(touched, `${name}.endDate`) &&
                        getIn(errors, `${name}.endDate`)
                    )
                    return (
                        <React.Fragment>
                            <TextField
                                fullWidth
                                margin="normal"
                                name={`${name}.startDate`}
                                helperText={
                                    getIn(touched, `${name}.startDate`) &&
                                    getIn(errors, `${name}.startDate`)
                                }
                                onBlur={handleBlur}
                                {...startProps}
                            />
                            <Box sx={{ mx: 2 }}> - </Box>
                            <TextField
                                fullWidth
                                margin="normal"
                                name={`${name}.endDate`}
                                helperText={
                                    getIn(touched, `${name}.endDate`) &&
                                    getIn(errors, `${name}.endDate`)
                                }
                                onBlur={handleBlur}
                                {...endProps}
                            />
                        </React.Fragment>
                    )
                }
                }
            />
        </LocalizationProvider>
    );
}

export default DateRangePicker;