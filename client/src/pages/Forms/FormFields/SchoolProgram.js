import { useState, useEffect } from 'react';
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
}) => {
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        const [group, index, ...others] = name.split('.');
        const groupTeachers = values.groups[index].teachers;

        if(groupTeachers) {
            setTeachers(groupTeachers);
        }


    }, [values.groups])


    return (
        <>
            {teachers.map((teacher, index) => {
                return (
                    <TextField
                        label={teacher.label}
                        //name={name + '.lesson'}
                        key={index}
                    />
                );
            })}
        </>
    );
}

export default SchoolProgram;