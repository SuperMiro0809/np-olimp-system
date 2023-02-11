import { useEffect } from 'react';
import { TextField } from '@mui/material';
import { getIn, FieldArray } from 'formik';

const SchoolProgram = ({
    formikProps,
    name = '',
    parentIndex = null
}) => {
    const [group, index, ...others] = name.split('.');
    const {
        setFieldValue,
        setFieldTouched,
        values,
        touched,
        errors,
    } = formikProps;

    useEffect(() => {
        const groupTeachers = values.groups[index].teachers;

        if (groupTeachers) {

            const program = values.groups[index].program[parentIndex];
            const teacherValues = groupTeachers.map((teacher) => ({ teacher_name: teacher.label, teacher_id: teacher.value, lessons: '' }));

            if (!program.teachers) {
                setFieldValue(`${name}.${parentIndex}.teachers`, teacherValues);
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

                setFieldValue(`${name}.${parentIndex}.teachers`, teacherValues);
            }


            // values.groups[index].program.forEach((program, index) => {
            //     const teacherValues = groupTeachers.map((teacher) => ({ teacher_name: teacher.label, teacher_id: teacher.value, lessons: '' }))
            //     console.log(program);
            //     if (!program.teachers) {
            //         setFieldValue(`${name}.${parentIndex}.teachers`, teacherValues);
            //     } else {
            //         program.teachers.forEach((teacher) => {
            //             const t = teacherValues.find(obj => {
            //                 return obj.teacher_id === teacher.teacher_id
            //             });

            //             if (t) {
            //                 const tIndex = teacherValues.findIndex((obj => obj.teacher_id == teacher.teacher_id));
            //                 teacherValues[tIndex].lessons = teacher.lessons;
            //             }
            //         })

            //         setFieldValue(`${name}.${parentIndex}.teachers`, teacherValues);
            //     }

            // });
        }
    }, [values.groups[index].teachers])


    return (
        <>
            <FieldArray
                name={`${name}.${parentIndex}.teachers`}
                render={arrayHelpers => (
                    <>
                        {values.groups[index].program[parentIndex].teachers && values.groups[index].program[parentIndex].teachers.map((teacher, tIndex) => {
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
                                    value={values.groups[index].program[parentIndex].teachers[tIndex].lessons}
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