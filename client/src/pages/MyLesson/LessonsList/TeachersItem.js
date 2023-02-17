import { useEffect } from 'react';
import { TextField } from '@mui/material';
import { FieldArray, getIn } from 'formik';

const TeachersItem = ({
    formikProps,
    name = '',
    parentIndex = null
}) => {
    const {
        setFieldValue,
        setFieldTouched,
        values,
        touched,
        errors,
    } = formikProps;

    useEffect(() => {
        if(!values.program[parentIndex].teachers) {
            const teachersValues = values.teachers.map((teacher) => {
                return {
                    lessons: '',
                    teacher_id: teacher.teacher_id,
                    teacher_name: teacher.teacher_name
                }
            });

            setFieldValue(`${name}.${parentIndex}.teachers`, teachersValues);
        }
    }, [])

    return (
        <FieldArray
            name={`${name}.${parentIndex}.teachers`}
            render={arrayHelpers => (
                <>
                    {values.program[parentIndex].teachers && values.program[parentIndex].teachers.map((teacher, tIndex) => {
                        const fieldName = `${name}.${parentIndex}.teachers.${tIndex}.lessons`;

                        return (
                            <TextField
                                name={fieldName}
                                type='number'
                                label={teacher.teacher_name}
                                error={Boolean(
                                    getIn(touched, fieldName) &&
                                    getIn(errors, fieldName)
                                )}
                                onChange={(event) => {
                                    setFieldValue(fieldName, event.target.value);
                                }}
                                onBlur={(e) => {
                                    setFieldTouched(fieldName, true);
                                }}
                                value={values.program[parentIndex].teachers[tIndex].lessons}
                                margin='normal'
                                key={teacher.teacher_id}
                            />
                        );
                    })}
                </>
            )}
        />
    );
}

export default TeachersItem;