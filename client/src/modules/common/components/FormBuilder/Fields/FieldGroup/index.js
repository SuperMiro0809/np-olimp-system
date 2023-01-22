import { Box } from '@mui/material';
import GroupHeading from './GroupHeading';
import Fields from '../index';
import { getIn } from 'formik';

const FieldGroup = ({
    field,
    baseProps,
    values,
    ...otherProps
}) => {
    return (
        <Box sx={{ ml: 2 }}>
            <GroupHeading
                title={field.title}
                variant={field.variant || 'h4'}
            />

            {field.fields.map((f, index) => {
                const fieldName = field.name + '.' + f.name;

                const props = {
                    ...baseProps,
                    label: f.label,
                    name: fieldName,
                    fullWidth: Object.hasOwn(f, 'fullWidth') ? f.fullWidth : true,
                    error: Boolean(
                        getIn(otherProps.touched, fieldName) &&
                        getIn(otherProps.errors, fieldName)
                    ),
                    margin: Object.hasOwn(f, 'margin') ? f.margin : 'normal',
                    value: values[field.name][f.name],
                    variant: Object.hasOwn(f, 'variant') ? f.variant : 'outlined',
                    helperText: getIn(otherProps.touched, fieldName) && getIn(otherProps.errors, fieldName),
                    key: index
                };

                return (
                    <Fields
                        field={f}
                        baseProps={props}
                        key={f.name}
                        values={values}
                        touched={otherProps.touched}
                        errors={otherProps.errors}
                        setFieldValue={otherProps.setFieldValue}
                    />
                );
            })}
        </Box>
    );
}

export default FieldGroup;