import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { FieldArray } from 'formik';
import ArrayItem from './ArrayItem';

const Additional = ({
    setFieldValue,
    values,
    touched,
    errors
}) => {
    const [teachers, setTeachers] = useState([]);

    const fields = [
        { type: 'multiline', name: 'letter', label: 'Писмо' },
        { type: 'upload', name: 'files', label: 'Файлове', accept: '.jpg,.png,.jpeg,.docx,.pdf,.doc', multiple: true },
    ];

    useEffect(() => {
        const teachersArray = [];

        values.groups.forEach((group, index) => {
            if (Array.isArray(group.teachers)) {
                group.teachers.forEach((teacher) => {
                    teachersArray.push(teacher);
                })
            }
        });

        let teacherValues = teachersArray.map((teacher) => ({ letter: '', files: '' }));

        setFieldValue('letters', teacherValues);
        setTeachers(teachersArray);

    }, [values.groups])

    return (
        <>
            <Box sx={{ mb: 1, mt: 2 }}>
                <Typography
                    color="textPrimary"
                    variant='h4'
                >
                    Мотивационно писмо
                </Typography>
            </Box>

            {teachers.length > 0 ? (
                <FieldArray
                    name='letters'
                    render={arrayHelpers => (
                        <>
                            {teachers.map((teacher, index) => (
                                <ArrayItem
                                    arrayHelpers={arrayHelpers}
                                    current={teacher}
                                    teachers={teachers}
                                    fields={fields}
                                    index={index}
                                    values={values}
                                    setFieldValue={setFieldValue}
                                    touched={touched}
                                    errors={errors}
                                    key={index}
                                />
                            ))}
                        </>
                    )}
                />
            ) : (
                <Box sx={{ textAlign: 'center', mb: 1, mt: 2 }}>
                    <Typography
                        color="textPrimary"
                        variant='h5'
                    >
                        Няма избрани учители
                    </Typography>
                </Box>
            )}
        </>
    );
}

export default Additional;