import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import {
    TimePicker as TimePickerMUI,
    LocalizationProvider
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import 'dayjs/locale/bg';

const TimePicker = ({
    baseProps,
    setFieldValue,
    setFieldTouched
}) => {
    const { value, name } = baseProps;
    const [time, setTime] = useState('');

    useEffect(() => {
        if(value) {
            const d = new Date();
            const [hour, min, sec] = value.split(':');

            d.setHours(hour);
            d.setMinutes(min);

            setTime(d);
        }
    }, [value])

    return (
        <LocalizationProvider adapterLocale={'bg'} dateAdapter={AdapterDayjs}>
            <TimePickerMUI
                label={baseProps.label}
                value={time}
                onChange={(newValue) => {
                    const d = new Date(newValue);
                    setTime(newValue);
           
                    if(d instanceof Date && !isNaN(d) && newValue) {
                        setFieldValue(name, d.toLocaleTimeString());
                    }else {
                        setFieldValue(name, '');
                    }
                }}
                renderInput={(params) =>
                    <TextField
                        sx={{ flexGrow: 1 }}
                        {...params}
                        {...baseProps}
                        onChange={() => { }}
                        onBlur={(e) => {
                            setFieldTouched(name, true);
                        }}
                    />
                }
            />
        </LocalizationProvider>
    );
}

export default TimePicker;