import { Box, Typography } from '@mui/material';
import Fields from '@modules/common/components/FormBuilder/Fields';

const Budget = ({
    setFieldValue,
    handleChange,
    handleBlur,
    values,
    touched,
    errors
}) => {
    const fields = [
        { type: 'number', name: 'hourPrice', label: 'Цена на час' }
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
        </>
    );
}

export default Budget;