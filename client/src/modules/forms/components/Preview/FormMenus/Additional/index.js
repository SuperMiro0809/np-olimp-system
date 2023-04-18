import { Box, Typography } from '@mui/material';
import { FieldArray } from 'formik';
import ArrayItem from './ArrayItem';
import Fields from '@modules/common/components/FormBuilder/Fields';

const Additional = ({ formikProps }) => {
    const {
        handleChange,
        handleBlur,
        values,
        touched,
        errors
    } = formikProps;

    const teacherFields = [
        { type: 'multiline', name: 'letter', label: 'Писмо', readOnly: true },
        { type: 'download', name: 'files', label: 'Файлове', accept: '.docx,.pdf,.doc', multiple: true },
    ];

    const fields = [
        { type: 'download', name: 'declarations', label: 'Копия от декларации', accept: '.pdf', multiple: true },
    ]

    return (
        <>
            <Box sx={{ mb: 1, mt: 2 }}>
                <Typography
                    color="textPrimary"
                    variant='h4'
                >
                    Мотивационно писмо
                </Typography>
            </Box>

            {values.letters.length > 0 ? (
                <FieldArray
                    name='letters'
                    render={arrayHelpers => (
                        <>
                            {values.letters.map((teacher, index) => (
                                <ArrayItem
                                    arrayHelpers={arrayHelpers}
                                    current={teacher}
                                    teachers={values.letters}
                                    fields={teacherFields}
                                    index={index}
                                    formikProps={formikProps}
                                    key={index}
                                />
                            ))}
                        </>
                    )}
                />
            ) : (
                <Box sx={{ textAlign: 'center', mb: 1, mt: 2 }}>
                    <Typography
                        color="textPrimary"
                        variant='h5'
                    >
                        Няма избрани учители
                    </Typography>
                </Box>
            )}

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
        </>
    );
}

export default Additional;