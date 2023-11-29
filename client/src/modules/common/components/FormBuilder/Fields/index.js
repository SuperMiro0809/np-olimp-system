import {
    TextField,
    Autocomplete,
    MenuItem,
    Divider,
    InputAdornment,
    Box,
    Typography,
    FormGroup,
    FormControlLabel,
    Checkbox
} from '@mui/material';
import RichTextEditor from './RichTextEditor';
import LangFields from './LangFields';
import FileUpload from './FileUpload';
import FileDownload from './FileDownload';
import ArrayField from './ArrayField';
import FieldGroup from './FieldGroup';
import GroupHeading from './FieldGroup/GroupHeading';
import DateRangePicker from './DateField/DateRangePicker';
import DatePicker from './DateField/DatePicker';
import TimePicker from './TimeField/TimePicker';
import TimeRangePicker from './TimeField/TimeRangePicker';
import Toggle from './Toggle';
import CheckboxField from './CheckboxField';
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
                    InputProps={{
                        startAdornment: field.startAdornment && <InputAdornment position='start'>{field.startAdornment.text}</InputAdornment>,
                        endAdornment: field.endAdornment && <InputAdornment position='end'>{field.endAdornment.text}</InputAdornment>,
                        readOnly: field.readOnly || false
                    }}
                />
            )}

            {field.type === 'multiline' && (
                <RichTextEditor
                    rows={field.rows || 2}
                    formikProps={formikProps}
                    readOnly={field.readOnly || false}
                    {...baseProps}
                />
            )}

            {field.type === 'select' && (
                <TextField
                    select
                    {...baseProps}
                    InputProps={{
                        startAdornment: field.startAdornment && <InputAdornment position='start'>{field.startAdornment.text}</InputAdornment>,
                        endAdornment: field.endAdornment && <InputAdornment position='end'>{field.endAdornment.text}</InputAdornment>,
                        readOnly: field.readOnly || false
                    }}
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
                    disabled={baseProps.disabled}
                    disablePortal
                    options={field.options}
                    defaultValue={baseProps.value || (field.multiple ? [] : '')}
                    value={baseProps.value || (field.multiple ? [] : '')}
                    getOptionLabel={(option) => option.label || option.title || ''}
                    isOptionEqualToValue={(option, value) => option.value === value.value}
                    onChange={(e, value) => (
                        setFieldValue(baseProps.name, value)
                    )}
                    freeSolo={Object.hasOwn(field, 'freeSolo') ? field.freeSolo : true}
                    readOnly={field.readOnly || false}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            {...baseProps}
                            onChange={() => { }}
                        />
                    )}
                    noOptionsText={field.noOptionsText || 'Няма данни'}
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

            {field.type === 'download' && (
                <FileDownload
                    label={field.label}
                    multiple={field.multiple}
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
                    controls={Object.hasOwn(field, 'controls') ? field.controls : true}
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

            {field.type === 'toggle' && (
                <Toggle
                    field={field}
                    baseProps={baseProps}
                    element={baseProps.element || values[baseProps.name]}
                    {...formikProps}
                />
            )}

            {field.type === 'checkbox' && (
                <CheckboxField
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