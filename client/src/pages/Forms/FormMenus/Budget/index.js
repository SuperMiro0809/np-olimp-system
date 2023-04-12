import { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Divider,
    Card,
} from '@mui/material';
import Fields from '@modules/common/components/FormBuilder/Fields';
import { getIn } from 'formik';
import AddFab from '@modules/common/components/Buttons/Fab/Add';
import RemoveFab from '@modules/common/components/Buttons/Fab/Remove';

const Budget = ({ formikProps }) => {
    const [teachers, setTeachers] = useState([]);
    const {
        setFieldValue,
        handleChange,
        handleBlur,
        values,
        touched,
        errors
    } = formikProps;

    const fields = [
        { type: 'number', name: 'hourPrice', label: 'Цена на час' }
    ];

    const administrationFields = [
        { type: 'text', name: 'activity', label: 'Дейност', margin: 'none' },
        { type: 'number', name: 'price', label: 'Разход', margin: 'none' }
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

        let teacherValues = teachersArray.map((teacher) => ({ teacher_id: teacher.value, teacher_name: teacher.label, lessons: 0 }))

        teacherValues = teacherValues.map((teacher) => {
            const id = teacher.teacher_id;
            let lessons = 0;

            values.groups.forEach((group) => {
                group.program.forEach((program) => {
                    if (program.teachers) {
                        program.teachers.forEach((t) => {
                            if (t.teacher_id === id && t.lessons) {
                                lessons += Number(t.lessons);
                            }
                        });
                    }
                });
            });

            return { ...teacher, lessons };
        });

        setTeachers(teacherValues);

    }, [values.groups]);

    useEffect(() => {
        setFieldValue('budget.teachers', teachers);
        calculateCosts();

    }, [teachers, values.budget.hourPrice])

    const calculateCosts = () => {
        let trainingCosts = 0;

        teachers.forEach((teacher) => {
            trainingCosts += teacher.lessons * values.budget.hourPrice;
        })

        setFieldValue('budget.trainingCosts', trainingCosts);
        setFieldValue('budget.administrationCosts', 30 / 100 * trainingCosts);
    }

    const onAddHandler = () => {
        let administrationValues = [];

        if(values.budget.administration) {
            administrationValues = values.budget.administration.map((administration) => ( { activity: administration.activity, price: administration.price } ))
        }

        administrationValues.push({ activity: '', price: '' });

        setFieldValue('budget.administration', administrationValues);
    }

    const onRemoveHandler = (index) => {
        let administrationValues = values.budget.administration;
        administrationValues.splice(index, 1);

        setFieldValue('budget.administration', administrationValues);
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
                    error: Boolean(
                        getIn(touched, name) &&
                        getIn(errors, name)
                    ),
                    margin: Object.hasOwn(field, 'margin') ? field.margin : 'normal',
                    value: values.budget[field.name],
                    variant: Object.hasOwn(field, 'variant') ? field.variant : 'outlined',
                    helperText: getIn(touched, name) && getIn(errors, name),
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

            <Box>
                <Box sx={{ mb: 1, mt: 2 }}>
                    <Typography
                        color="textPrimary"
                        variant='h5'
                    >
                        Обучение на учениците
                    </Typography>
                </Box>
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
                        </TableBody>
                    </Table>
                    <Divider />
                    <Box sx={{ mt: 1, textAlign: 'end' }}>
                        <Typography variant='h5'>Общо {values.budget.trainingCosts} лв.</Typography>
                    </Box>
                </TableContainer>
            </Box>

            <Box sx={{ mt: 5 }}>
                <Box sx={{ mb: 1, mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography
                        color='textPrimary'
                        variant='h5'
                    >
                        Административни разходи
                    </Typography>
                    <AddFab sx={{ width: '30px', height: '30px', minHeight: '30px' }} handler={onAddHandler} />
                </Box>
                <Divider />
                <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        </TableHead>
                        <TableBody>
                            {values.budget.administration && values.budget.administration.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    {administrationFields.map((field, i) => {
                                        const name = `budget.administration.${index}.${field.name}`;

                                        const baseProps = {
                                            label: field.label,
                                            name: name,
                                            onBlur: handleBlur,
                                            onChange: handleChange,
                                            fullWidth: Object.hasOwn(field, 'fullWidth') ? field.fullWidth : true,
                                            error: Boolean(
                                                getIn(touched, name) &&
                                                getIn(errors, name)
                                            ),
                                            margin: Object.hasOwn(field, 'margin') ? field.margin : 'normal',
                                            value: values.budget.administration[index][field.name],
                                            variant: Object.hasOwn(field, 'variant') ? field.variant : 'outlined',
                                            helperText: getIn(touched, name) && getIn(errors, name),
                                            disabled: Object.hasOwn(field, 'disabled') ? field.disabled : false,
                                            key: i,
                                            element: values.budget,
                                            size: 'small'
                                        };

                                        return (
                                            <TableCell key={i}>
                                                <Fields
                                                    field={field}
                                                    baseProps={baseProps}
                                                    formikProps={formikProps}
                                                    updateUploadedFiles={() => { }}
                                                    key={i}
                                                />
                                            </TableCell>
                                        );
                                    })}
                                    <TableCell sx={{ width: '30px', pr: 0, textAlign: 'end' }}>
                                        <RemoveFab sx={{ width: '30px', height: '30px', minHeight: '30px' }} handler={() => onRemoveHandler(index)}/>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Divider />
                    <Box sx={{ mt: 1, textAlign: 'end' }}>
                        <Typography variant='h5'>Общо {values.budget.administrationCosts} лв.</Typography>
                    </Box>
                    {Boolean(getIn(errors, 'budget.administrationCosts')) && <Typography color='error' fontStyle='italic' textAlign='end'>{getIn(errors, 'budget.administrationCosts')}</Typography>}
                </TableContainer>
            </Box>

            <Box sx={{ width: '400px', ml: 'auto', mt: 5 }}>
                <Card sx={{ p: 2, my: 2 }}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Typography variant='h4'>Крайна сума:</Typography>
                        <Typography variant='h4'>{values.budget.trainingCosts + values.budget.administrationCosts} лв.</Typography>
                    </Box>
                </Card>
            </Box>
        </>
    );
}

export default Budget;