import { useEffect } from 'react';
import { TextField } from '@mui/material';
import { getIn, FieldArray } from 'formik';

const SchoolProgram = ({
    setFieldValue,
    setFieldTouched,
    values,
    touched,
    errors,
    name = '',
    parentIndex = null
}) => {
    const [group, index, ...others] = name.split('.');
    
    useEffect(() => {
        const groupTeachers = values.groups[index].teachers;

        if (groupTeachers) {
            values.groups[index].program.forEach((program, index) => {
                const teacherValues = groupTeachers.map((teacher) => ({ teacher_name: teacher.label, teacher_id: teacher.value, lessons: '' }))

                if (!program.teachers) {
                    setFieldValue(`${name}.${index}.teachers`, teacherValues);
                } else {
                    program.teachers.forEach((teacher) => {
                        const t = teacherValues.find(obj => {
                            return obj.teacher_id === teacher.teacher_id
                        });

                        if (t) {
                            const tIndex = teacherValues.findIndex((obj => obj.teacher_id == teacher.teacher_id));
                            teacherValues[tIndex].lessons = teacher.lessons;
                        }
                    })

                    setFieldValue(`${name}.${index}.teachers`, teacherValues);
                }

            });
        }
    }, [values.groups[index].teachers])


    return (
        <>
            <FieldArray
                name={`${name}.${index}.teachers`}
                render={arrayHelpers => (
                    <>
                        {values.groups[index].program[index].teachers && values.groups[index].program[index].teachers.map((teacher, tIndex) => {
                            const fieldName = `${name}.${index}.teachers.${tIndex}.lessons`;
                           
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
                                    value={values.groups[index].program[index].teachers[tIndex].lessons}
                                    margin='normal'
                                    key={teacher.teacher_id}
                                />
                            );
                        })}
                    </>
                )}
            />
        </>

    );
}

export default SchoolProgram;