import { useState } from 'react';

import TextField from '@mui/material/TextField';
import {
    TimePicker as TimePickerMUI,
    LocalizationProvider
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import moment from 'moment';

import 'dayjs/locale/bg';

const TimePicker = ({
    baseProps,
    setFieldValue,
    setFieldTouched
}) => {
    const { value, name } = baseProps;
    const [time, setTime] = useState(value);

    return (
        <LocalizationProvider adapterLocale={'bg'} dateAdapter={AdapterDayjs}>
            <TimePickerMUI
                label={baseProps.label}
                value={time}
                onChange={(newValue) => {
                    const d = new Date(newValue);
                    setTime(newValue);

                    if(d instanceof Date && !isNaN(d)) {
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