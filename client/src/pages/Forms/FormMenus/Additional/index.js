import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { FieldArray } from 'formik';
import ArrayItem from './ArrayItem';
import Fields from '@modules/common/components/FormBuilder/Fields';

const Additional = ({ formikProps }) => {
    const [teachers, setTeachers] = useState([]);
    const {
        setFieldValue,
        handleChange,
        handleBlur,
        values,
        touched,
        errors
    } = formikProps;

    const teacherFields = [
        { type: 'multiline', name: 'letter', label: 'Писмо' },
        { type: 'upload', name: 'files', label: 'Файлове', accept: '.docx,.pdf,.doc', multiple: true },
    ];

    const fields = [
        { type: 'upload', name: 'declarations', label: 'Копия от декларации', accept: '.pdf', multiple: true },
    ]

    useEffect(() => {
        const teachersArray = [];

        values.groups.forEach((group, index) => {
            if (Array.isArray(group.teachers)) {
                group.teachers.forEach((teacher) => {
                    const t = teachersArray.find(obj => {
                        return obj.value === teacher.value
                    });

                    if (!t) {
                        teachersArray.push(teacher);
                    }
                })
            }
        });

        let teacherValues = teachersArray.map((teacher) => ({ teacher_id: teacher.value, letter: '', files: '' }));

        if (values.letters) {
            teacherValues = teacherValues.map((teacher) => {
                const id = teacher.teacher_id;
                
                values.letters.forEach((letter) => {
                    if(letter.teacher_id === id) {
                        teacher.letter = letter.letter;
                        teacher.files = letter.files;
                        teacher.id = letter.id ?? null;
                    } 
                });

                return teacher;
            });
            
            setFieldValue('letters', teacherValues);
        } else {
            let teacherValues = teachersArray.map((teacher) => ({ teacher_id: teacher.value, letter: '', files: '' }));

            setFieldValue('letters', teacherValues);
        }

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
                                    fields={teacherFields}
                                    index={index}
                                    formikProps={formikProps}
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

            {fields.map((field, index) => {

                const baseProps = {
                    label: field.label,
                    name: field.name,
                    onBlur: handleBlur,
                    onChange: handleChange,
                    fullWidth: Object.hasOwn(field, 'fullWidth') ? field.fullWidth : true,
                    error: Boolean(touched[field.name] && errors[field.name]),
                    margin: Object.hasOwn(field, 'margin') ? field.margin : 'normal',
                    value: values[field.name],
                    variant: Object.hasOwn(field, 'variant') ? field.variant : 'outlined',
                    helperText: touched[field.name] && errors[field.name],
                    disabled: Object.hasOwn(field, 'disabled') ? field.disabled : false,
                    key: index
                };

                return (
                    <Fields
                        field={field}
                        baseProps={baseProps}
                        formikProps={formikProps}
                        updateUploadedFiles={() => { }}
                        key={index}
                    />
                );
            })}
        </>
    );
}

export default Additional;