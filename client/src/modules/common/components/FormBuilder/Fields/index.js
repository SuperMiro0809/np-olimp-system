import {
    TextField,
    Autocomplete,
    MenuItem,
    Divider,
    Box,
    Typography
} from '@mui/material';
import RichTextEditor from './RichTextEditor';
import LangFields from './LangFields';
import FileUpload from './FileUpload';
import ArrayField from './ArrayField';
import FieldGroup from './FieldGroup';
import GroupHeading from './FieldGroup/GroupHeading';
import PropTypes from 'prop-types';

const Fields = ({ field, baseProps, setFieldValue, values, touched, errors, updateUploadedFiles }) => {
    return (
        <>
            {(field.type === 'text' || field.type === 'email' || field.type === 'password' || field.type === 'number') && (
                <TextField
                    type={field.type}
                    {...baseProps}
                />
            )}

            {field.type === 'multiline' && (
                <RichTextEditor
                    rows={field.rows || 2}
                    setFieldValue={setFieldValue}
                    {...baseProps}
                />
            )}

            {field.type === 'select' && (
                <TextField
                    select
                    {...baseProps}
                >
                    {field.options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            )}

            {field.type === 'autocomplete' && (
                <Autocomplete
                    multiple={Object.hasOwn(field, 'multiple') ? field.multiple : false}
                    value={baseProps.value || (field.multiple ? [] : '')}
                    disablePortal
                    options={field.options}
                    isOptionEqualToValue={(option, value) => option.value === value}
                    onChange={(e, value) => (
                        setFieldValue(baseProps.name, value)
                    )}
                    freeSolo
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            {...baseProps}
                            onChange={() => { }}
                        />
                    )}
                />
            )}

            {field.type === 'divider' && (
                <Divider sx={{ my: 1 }} />
            )}

            {field.type === 'lang' && (
                <LangFields
                    field={field}
                    baseProps={baseProps}
                    setFieldValue={setFieldValue}
                    values={values}
                    touched={touched}
                    errors={errors}
                />
            )}

            {field.type === 'upload' && (
                <FileUpload
                    accept={field.accept}
                    label={field.label}
                    multiple={field.multiple}
                    updateFilesCb={updateUploadedFiles}
                    setFieldValue={setFieldValue}
                    name={baseProps.name}
                    values={values}
                    element={baseProps.element || values[baseProps.name]}
                />
            )}

            {field.type === 'array' && (
                <ArrayField
                    fields={field.fields}
                    arrayVariant={field.arrayVariant || 'inline'}
                    labelVariant={field.labelVariant || 'h4'}
                    element={baseProps.element || values[baseProps.name]}
                    baseProps={baseProps}
                    itemLabel={field.itemLabel}
                    setFieldValue={setFieldValue}
                    values={values}
                    touched={touched}
                    errors={errors}
                />
            )}

            {field.type === 'heading' && (
                <GroupHeading
                    title={field.title}
                    variant={field.variant || 'h4'}
                />
            )}

            {field.type === 'group' && (
                <FieldGroup
                    field={field}
                    baseProps={baseProps}
                    setFieldValue={setFieldValue}
                    values={values}
                    touched={touched}
                    errors={errors}
                />
            )}
        </>
    )
}

Fields.propTypes = {
    field: PropTypes.object.isRequired,
    baseProps: PropTypes.object.isRequired,
    setFieldValue: PropTypes.func
};

export default Fields;