import React, { useState } from 'react';
import { TextField } from '@mui/material';
import {
    DatePicker as DatePickerMUI,
    LocalizationProvider,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import moment from 'moment';
import 'dayjs/locale/bg';

const DatePicker = ({
    field,
    baseProps,
    setFieldValue,
    setFieldTouched
}) => {
    const { element, name } = baseProps;
    const [date, setDate] = useState(element);

    return (
        <LocalizationProvider adapterLocale={'bg'} dateAdapter={AdapterDayjs}>
            <DatePickerMUI
                inputFormat={field.format || 'DD/MM/YYYY'}
                label={baseProps.label}
                value={date}
                onChange={(newValue) => {
                    const d = new Date(newValue);
                    setDate(newValue);

                    if(d instanceof Date && !isNaN(d)) {
                        setFieldValue(name, moment(newValue).format('YYYY/MM/DD'))
                    }else {
                        setFieldValue(name, d)
                    }
                }}
                renderInput={(params) =>
                    <TextField
                        {...params}
                        {...baseProps} 
                        onBlur={(e) => {
                            setFieldTouched(name, true);
                        }}
                    />
                }
                disableMaskedInput={true}
            />
        </LocalizationProvider>
    );
}

export default DatePicker;