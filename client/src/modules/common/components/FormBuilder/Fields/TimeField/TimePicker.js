import { useState } from 'react';

import TextField from '@mui/material/TextField';
import {
    TimePicker as TimePickerMUI,
    LocalizationProvider
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import 'dayjs/locale/bg';

const TimePicker = ({
    baseProps,
    setFieldValue
}) => {
    const { element, name } = baseProps;
    const [value, setValue] = useState(element);

    return (
        <LocalizationProvider adapterLocale={'bg'} dateAdapter={AdapterDayjs}>
            <TimePickerMUI
                label={baseProps.label}
                value={value}
                onChange={(newValue) => {
                    setValue(newValue);
                    setFieldValue(name, new Date(newValue).toLocaleTimeString())
                }}
                renderInput={(params) => <TextField sx={{ flexGrow: 1 }} {...params} {...baseProps} />}
            />
        </LocalizationProvider>
    );
}

export default TimePicker;