import React, { useState } from 'react';
import { TextField } from '@mui/material';
import {
    DatePicker as DatePickerMUI,
    LocalizationProvider,
} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import { bg } from 'date-fns/locale';
import moment from 'moment';
import 'dayjs/locale/bg';

const DatePicker = ({
    field,
    baseProps,
    setFieldValue,
    values,
    touched,
    errors
}) => {
    const { element, name } = baseProps;
    const [date, setDate] = useState(element);

    return (
        <LocalizationProvider adapterLocale={'bg'} localeText={bg} dateAdapter={AdapterDayjs}>
            <DatePickerMUI
                label={baseProps.label}
                value={date}
                onChange={(newValue) => {
                    setDate(newValue);
                    setFieldValue(name, moment(newValue).format('YYYY/MM/DD'))
                }}
                renderInput={(params) => <TextField {...params} {...baseProps} />}
            />
        </LocalizationProvider>
    );
}

export default DatePicker;