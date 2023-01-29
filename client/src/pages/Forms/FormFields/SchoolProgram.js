import { useEffect } from 'react';
import { TextField } from '@mui/material';
import Fields from '@modules/common/components/FormBuilder/Fields';

const SchoolProgram = ({
    setFieldValue,
    handleChange,
    handleBlur,
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
            {values.groups[index].program[parentIndex].teachers && values.groups[index].program[parentIndex].teachers.map((teacher, tIndex) => {

                return (
                    <TextField
                        label={teacher.teacher_name}
                        onChange={(event) => {
                            setFieldValue(`${name}.${parentIndex}.teachers.${tIndex}.lessons`, event.target.value);
                        }}
                        onBlur={handleBlur}
                        name={`${name}.${parentIndex}.teachers.${tIndex}.lessons`}
                        value={values.groups[index].program[parentIndex].teachers[tIndex].lessons}
                        margin='normal'
                        key={index}
                    />
                );
            })}
        </>
    );
}

export default SchoolProgram;