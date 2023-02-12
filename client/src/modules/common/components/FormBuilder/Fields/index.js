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
import DateRangePicker from './DateField/DateRangePicker';
import DatePicker from './DateField/DatePicker';
import TimePicker from './TimeField/TimePicker';
import TimeRangePicker from './TimeField/TimeRangePicker';
import PropTypes from 'prop-types';

const Fields = ({
    field,
    baseProps,
    formikProps,
    updateUploadedFiles
}) => {
    const { setFieldValue, setFieldTouched, values } = formikProps;

    return (
        <>
            {(field.type === 'text' || field.type === 'email' || field.type === 'password' || field.type === 'number') && (
                <TextField
                    type={field.type}
                    {...baseProps}
                    onChange={(event) => {
                        setFieldValue(baseProps.name, event.target.value)
                    }}
                    onBlur={() => {
                        setFieldTouched(baseProps.name, true)
                    }}
                />
            )}

            {field.type === 'multiline' && (
                <RichTextEditor
                    rows={field.rows || 2}
                    formikProps={formikProps}
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
                    {...formikProps}
                />
            )}

            {field.type === 'upload' && (
                <FileUpload
                    accept={field.accept}
                    label={field.label}
                    multiple={field.multiple}
                    updateFilesCb={updateUploadedFiles}
                    name={baseProps.name}
                    element={baseProps.element || values[baseProps.name]}
                    {...formikProps}
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
                    formikProps={formikProps}
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
                    formikProps={formikProps}
                />
            )}

            {/* {field.type === 'date-range' && (
                <DateRangePicker
                    field={field}
                    baseProps={baseProps}
                    setFieldValue={setFieldValue}
                    values={values}
                    touched={touched}
                    errors={errors}
                />
            )} */}

            {field.type === 'date' && (
                <DatePicker
                    field={field}
                    baseProps={baseProps}
                    element={baseProps.element || values[baseProps.name]}
                    {...formikProps}
                />
            )}

            {field.type === 'time' && (
                <TimePicker
                    field={field}
                    baseProps={baseProps}
                    element={baseProps.element || values[baseProps.name]}
                    {...formikProps}
                />
            )}

            {field.type === 'time-range' && (
                <TimeRangePicker
                    field={field}
                    baseProps={baseProps}
                    element={baseProps.element || values[baseProps.name]}
                    {...formikProps}
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