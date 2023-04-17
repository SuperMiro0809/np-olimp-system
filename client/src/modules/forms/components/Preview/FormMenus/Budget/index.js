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

const Budget = ({ formikProps }) => {
    const {
        handleChange,
        handleBlur,
        values,
        touched,
        errors
    } = formikProps;

    const fields = [
        { type: 'number', name: 'hourPrice', label: 'Цена на час', readOnly: true }
    ];

    const administrationFields = [
        { type: 'text', name: 'activity', label: 'Дейност', margin: 'none', readOnly: true },
        { type: 'number', name: 'cost', label: 'Разход', margin: 'none', readOnly: true }
    ];

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
                            {values.budget.teachers.map((teacher, index) => (
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