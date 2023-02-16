import { useState } from 'react';
import {
    Box,
    ListItemText,
    Collapse
} from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import * as Yup from 'yup';

import { ExpandButton, ExpandWrapper } from '@modules/common/components/Expand';
import TimeRangePicker from '@modules/common/components/FormBuilder/Fields/TimeField/TimeRangePicker';
import FormBuilder from '@modules/common/components/FormBuilder';

import groupLessonsService from '@services/groupLessons';

import useAuth from '@modules/common/hooks/useAuth';
import useMessage from '@modules/common/hooks/useMessage';

const LessonItem = ({
    lesson
}) => {
    const [open, setOpen] = useState(true);
    const { user } = useAuth();
    const { addMessage } = useMessage();

    const timeRangeField = {
        type: 'time-range', name: 'time-range', fields: [
            { type: 'time', name: 'start', label: 'От' },
            { type: 'time', name: 'end', label: 'До' },
        ]
    };
    const timeRangeFieldBaseProps = {
        value: { start: lesson.startHour, end: lesson.endHour },
        name: timeRangeField.name,
        fullWidth: true,
        margin: 'normal',
        variant: 'outlined',
        disabled: true
    };

    const initialValues = {
        students: lesson.students
    };

    const fields = [
        {
            type: 'array', arrayVariant: 'inline', controls: false, name: 'students', label: 'Ученици', labelVariant: 'h5', itemLabel: 'Ученик', fields: [
                { type: 'text', name: 'name', label: 'Име', disabled: true },
                // {
                //     type: 'select', name: 'attendance', label: 'Присъствие', options: [
                //         { label: 'Присъства', value: 1 },
                //         { label: 'Отсъства', value: -1 }
                //     ]
                // },
                { type: 'toggle', name: 'attendance', label: 'Присъствие' }
            ]
        },
    ];

    const validationSchema = Yup.object().shape({
    });

    const onSubmit = (values, { setSubmitting }) => {        
        const data = {
            label: lesson.label,
            date: lesson.date,
            startHour: lesson.startHour,
            endHour: lesson.endHour,
            ...values
        }

        if(user) {
            groupLessonsService.edit(data, user.info.school_id, user.info.id, lesson.id)
            .then((res) => {
                addMessage('Занятието е запазено успешно', 'success');
                setSubmitting(false);
            })
            .catch((error) => {
                console.log(error);
                setSubmitting(false);
            })
       }
    };

    const submitButton = {
        label: 'Запази'
    }


    return (
        <Box>
            <ExpandWrapper>
                <ExpandButton sx={{ ml: 2, mb: !open ? 2 : 0 }} onClick={() => setOpen(!open)}>
                    {!open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    <ListItemText primary={`${lesson.class} - ${lesson.label}`} />
                </ExpandButton>
            </ExpandWrapper>

            <Collapse in={open}>
                <TimeRangePicker
                    field={timeRangeField}
                    baseProps={timeRangeFieldBaseProps}
                    setFieldValue={() => { }}
                    setFieldTouched={() => { }}
                    touched={[]}
                    errors={[]}
                />

                <FormBuilder
                    fields={fields}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                    submitButton={submitButton}
                    enableReinitialize
                />
            </Collapse>
        </Box>
    );
}

export default LessonItem;