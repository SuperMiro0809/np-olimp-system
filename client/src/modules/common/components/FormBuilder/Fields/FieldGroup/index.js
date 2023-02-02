import { Box } from '@mui/material';
import GroupHeading from './GroupHeading';
import Fields from '../index';
import { getIn } from 'formik';

const FieldGroup = ({
    field,
    baseProps,
    formikProps,
    ...otherProps
}) => {
    const { values, touched, errors } = formikProps;

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
                        getIn(touched, fieldName) &&
                        getIn(errors, fieldName)
                    ),
                    margin: Object.hasOwn(f, 'margin') ? f.margin : 'normal',
                    value: values[field.name][f.name],
                    variant: Object.hasOwn(f, 'variant') ? f.variant : 'outlined',
                    helperText: getIn(touched, fieldName) && getIn(errors, fieldName),
                    key: index
                };

                if(f.type === 'custom') {
                    const props = {
                        ...formikProps
                    };
                    const { component: Field } = f;

                    return (
                        <Field
                            {...props}
                            key={index}
                        />
                    );
                }

                return (
                    <Fields
                        field={f}
                        baseProps={props}
                        formikProps={formikProps}
                        key={f.name}
                    />
                );
            })}
        </Box>
    );
}

export default FieldGroup;