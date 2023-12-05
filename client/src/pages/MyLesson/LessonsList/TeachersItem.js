import { useEffect } from 'react';
import { TextField, InputAdornment } from '@mui/material';
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
        if(values.themes[parentIndex].theme) {
            const program = values.program.find(p => p.id === values.themes[parentIndex].theme.value);

            const teachersValues = program.teachers.map((teacher) => {
                return {
                    lessons: '',
                    remainingLessons: teacher.remainingLessons,
                    teacher_id: teacher.teacher_id,
                    teacher_name: teacher.name,
                    program_teacher_id: teacher.id
                }
            });

            setFieldValue(`${name}.${parentIndex}.teachers`, teachersValues);
        }
    }, [values.themes[parentIndex].theme])

    return (
        <FieldArray
            name={`${name}.${parentIndex}.teachers`}
            render={arrayHelpers => (
                <>
                    {values.themes[parentIndex].teachers && values.themes[parentIndex].teachers.map((teacher, tIndex) => {
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
                                value={values.themes[parentIndex].teachers[tIndex].lessons}
                                margin='normal'
                                InputProps={{
                                    endAdornment: <InputAdornment position='end'>/{teacher.remainingLessons}</InputAdornment>
                                }}
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