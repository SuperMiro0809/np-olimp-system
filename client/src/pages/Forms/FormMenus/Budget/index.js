import { useEffect, useState } from 'react';
import { Box, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import Fields from '@modules/common/components/FormBuilder/Fields';

const Budget = ({
    setFieldValue,
    handleChange,
    handleBlur,
    values,
    touched,
    errors
}) => {
    const [teachers, setTeachers] = useState([]);

    const fields = [
        { type: 'number', name: 'hourPrice', label: 'Цена на час' }
    ];

    useEffect(() => {
        const teachersArray = [];

        values.groups.forEach((group, index) => {
            if (Array.isArray(group.teachers)) {
                group.teachers.forEach((teacher) => {
                    const t = teachersArray.find(obj => {
                        return obj.value === teacher.value
                    });

                    if(!t) {
                        teachersArray.push(teacher);
                    }
                })
            }
        });

        let teacherValues = teachersArray.map((teacher) => ( { teacher_id: teacher.value, teacher_name: teacher.label, lessons: 0 } ))

        teacherValues = teacherValues.map((teacher) => {
            const id = teacher.teacher_id;
            let lessons = 0;

            values.groups.forEach((group) => {
                group.program.forEach((program) => {
                    if(program.teachers) {
                        program.teachers.forEach((t) => {
                            if(t.teacher_id === id && t.lessons) {
                                lessons += Number(t.lessons);
                            }
                        });
                    }
                });
            });

            return { ...teacher, lessons };
        });

        setTeachers(teacherValues);

    }, [values.groups])

    const calculateTotal = () => {
        let total = 0;

        teachers.forEach((teacher) => {
            total += teacher.lessons * values.budget.hourPrice;
        })

        return total;
    }

    return (
        <>
            <Box sx={{ mb: 1, mt: 2 }}>
                <Typography
                    color="textPrimary"
                    variant='h4'
                >
                    Бюджет
                </Typography>
            </Box>

            {fields.map((field, index) => {
                const name = 'budget.' + field.name;

                const baseProps = {
                    label: field.label,
                    name: name,
                    onBlur: handleBlur,
                    onChange: handleChange,
                    fullWidth: Object.hasOwn(field, 'fullWidth') ? field.fullWidth : true,
                    error: Boolean(touched[field.name] && errors[field.name]),
                    margin: Object.hasOwn(field, 'margin') ? field.margin : 'normal',
                    value: values.budget[field.name],
                    variant: Object.hasOwn(field, 'variant') ? field.variant : 'outlined',
                    helperText: touched[field.name] && errors[field.name],
                    key: index
                };

                return (
                    <Fields
                        field={field}
                        baseProps={baseProps}
                        setFieldValue={setFieldValue}
                        updateUploadedFiles={() => { }}
                        key={index}
                        values={values}
                        touched={touched}
                        errors={errors}
                    />
                );
            })}

            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={3}>Учител</TableCell>
                            <TableCell align="right">Финансиране</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {teachers.map((teacher, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell colSpan={3}>{teacher.teacher_name}</TableCell>
                                <TableCell align="right">{teacher.lessons * values.budget.hourPrice} ({teacher.lessons} часа x {values.budget.hourPrice} лв.)</TableCell>
                            </TableRow>
                        ))}

                        <TableRow>
                            <TableCell rowSpan={3} />
                            <TableCell colSpan={2} align='right' sx={{ fontWeight: 'bold' }}>Общо</TableCell>
                            <TableCell align='right' sx={{ fontWeight: 'bold' }}>{calculateTotal()} лв.</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default Budget;