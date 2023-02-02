import { useState } from 'react';
import { Formik } from 'formik';
import {
    Box,
    Button,
    Checkbox,
    FormHelperText,
    Tab,
    Tabs
} from '@mui/material';
import PropTypes from 'prop-types';
import Fields from './Fields';
import FormObserver from './FormObserver';
import TabPanel from '@modules/common/components/TabPanel';
import { constructArrayFieldValues } from './utils/constructInitialValues';

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const FormBuilder = ({
    fields,
    initialValues = {},
    menus,
    validationSchema,
    onSubmit,
    submitButton,
    enableReinitialize = false,
    handleOnChange = () => { }
}) => {
    const [selectedMenu, setSelectedMenu] = useState(0);

    const handleTabChange = (event, newValue) => {
        setSelectedMenu(newValue);
    };

    const constructInitialValues = (field) => {
        if (field.type === 'array') {
            constructArrayFieldValues(field, initialValues)
        } else if (field.type === 'lang') {
            if (!initialValues[field.name]) {
                initialValues[field.name] = {};

                field.selectors.forEach((selector) => {
                    initialValues[field.name][selector] = {};

                    field.fields.forEach((f) => {
                        initialValues[field.name][selector][f.name] = '';
                    });
                });
            }
        } else if (Object.hasOwn(field, 'fields')) {
            if (!initialValues[field.name]) {
                initialValues[field.name] = {};

                field.fields.forEach((f) => {
                    initialValues[field.name][f.name] = '';
                });
            }
        } else {
            if (!initialValues[field.name]) {
                initialValues[field.name] = '';
            }
        }
    }

    if (Array.isArray(fields)) {
        fields.forEach((field) => {
            constructInitialValues(field);
        });
    } else {
        for (let key in fields) {
            if (typeof fields[key] !== 'function') {
                fields[key].forEach((field) => {
                    constructInitialValues(field);
                });
            }
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize={enableReinitialize}
        >
            {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                isSubmitting,
                touched,
                values
            }) => {
                const formikProps = {
                    errors,
                    handleBlur,
                    handleChange,
                    setFieldValue,
                    touched,
                    values
                };

                return (
                    <form onSubmit={handleSubmit}>
                        <FormObserver handleOnChange={handleOnChange} />

                        {menus && menus.length > 0 ? (
                            <Box sx={{
                                flexGrow: 1,
                                bgcolor: "",
                                display: "flex",
                                gap: 3
                            }}>
                                <Tabs
                                    orientation="vertical"
                                    variant="scrollable"
                                    value={selectedMenu}
                                    onChange={handleTabChange}
                                    aria-label="Vertical tabs example"
                                    sx={{
                                        maxWidth: '200px',
                                        borderRight: 1,
                                        borderColor: 'divider',
                                        '& .MuiTabs-indicator': { backgroundColor: '#ff7701!important' },
                                        //'& .MuiTab-root': { color: blue[700] },
                                        //'& .Mui-selected': { color: '#96011c!important' },
                                    }}
                                >
                                    {menus.map((menu, index) => {
                                        const { icon: Icon } = menu;

                                        return <Tab label={menu.label} icon={<Icon />} {...a11yProps(index)} key={index} />
                                    })}
                                </Tabs>

                                {menus.map((menu, index) => {
                                    const item = fields[menu.id];

                                    if (typeof item === 'function') {
                                        const Component = item;

                                        return (
                                            <TabPanel value={selectedMenu} index={index} key={index}>
                                                <Component {...formikProps} />

                                                {index + 1 === menus.length ? (
                                                    <Box sx={{ py: 2 }}>
                                                        <Button
                                                            color={submitButton && submitButton.color ? submitButton.color : 'primary'}
                                                            size={submitButton && submitButton.size ? submitButton.size : 'large'}
                                                            variant={submitButton && submitButton.variant ? submitButton.variant : 'contained'}
                                                            fullWidth={submitButton && Object.hasOwn(submitButton, 'fullWidth') ? submitButton.fullWidth : true}
                                                            disabled={isSubmitting}
                                                            type="submit"
                                                        >
                                                            {submitButton && submitButton.label ? submitButton.label : 'Добави'}
                                                        </Button>
                                                    </Box>
                                                ) : (
                                                    <Box sx={{ py: 2 }}>
                                                        <Button
                                                            color={submitButton && submitButton.color ? submitButton.color : 'primary'}
                                                            size={submitButton && submitButton.size ? submitButton.size : 'large'}
                                                            variant={submitButton && submitButton.variant ? submitButton.variant : 'contained'}
                                                            fullWidth={submitButton && Object.hasOwn(submitButton, 'fullWidth') ? submitButton.fullWidth : true}
                                                            disabled={isSubmitting}
                                                            onClick={() => setSelectedMenu(index + 1)}
                                                            type="button"
                                                        >
                                                            Напред
                                                        </Button>
                                                    </Box>
                                                )}
                                            </TabPanel>
                                        );
                                    } else {
                                        return (
                                            <TabPanel value={selectedMenu} index={index} key={index}>
                                                {fields[menu.id].map((field, index) => {

                                                    if (field.type === 'custom') {
                                                        const baseProps = {
                                                            setFieldValue: setFieldValue,
                                                            handleBlur: handleBlur,
                                                            handleChange: handleChange,
                                                            values: values,
                                                            touched: touched,
                                                            errors: errors
                                                        };
                                                        const { component: Field } = field;

                                                        return (
                                                            <Field
                                                                {...formikProps}
                                                                key={index}
                                                            />
                                                        );
                                                    } else {
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
                                                                formikProps={formikProps}
                                                                updateUploadedFiles={() => { }}
                                                                key={index}
                                                            />
                                                        );
                                                    }
                                                })}

                                                {index + 1 === menus.length ? (
                                                    <Box sx={{ py: 2 }}>
                                                        <Button
                                                            color={submitButton && submitButton.color ? submitButton.color : 'primary'}
                                                            size={submitButton && submitButton.size ? submitButton.size : 'large'}
                                                            variant={submitButton && submitButton.variant ? submitButton.variant : 'contained'}
                                                            fullWidth={submitButton && Object.hasOwn(submitButton, 'fullWidth') ? submitButton.fullWidth : true}
                                                            disabled={isSubmitting}
                                                            type="submit"
                                                        >
                                                            {submitButton && submitButton.label ? submitButton.label : 'Добави'}
                                                        </Button>
                                                    </Box>
                                                ) : (
                                                    <Box sx={{ py: 2 }}>
                                                        <Button
                                                            color={submitButton && submitButton.color ? submitButton.color : 'primary'}
                                                            size={submitButton && submitButton.size ? submitButton.size : 'large'}
                                                            variant={submitButton && submitButton.variant ? submitButton.variant : 'contained'}
                                                            fullWidth={submitButton && Object.hasOwn(submitButton, 'fullWidth') ? submitButton.fullWidth : true}
                                                            disabled={isSubmitting}
                                                            onClick={() => setSelectedMenu(index + 1)}
                                                            type="button"
                                                        >
                                                            Напред
                                                        </Button>
                                                    </Box>
                                                )}

                                            </TabPanel>
                                        );
                                    }
                                })}
                            </Box>
                        ) : (
                            <>
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
                                            formikProps={formikProps}
                                            updateUploadedFiles={() => { }}
                                            key={index}
                                        />
                                    );
                                })}

                                <Box sx={{ py: 2 }}>
                                    <Button
                                        color={submitButton && submitButton.color ? submitButton.color : 'primary'}
                                        size={submitButton && submitButton.size ? submitButton.size : 'large'}
                                        variant={submitButton && submitButton.variant ? submitButton.variant : 'contained'}
                                        fullWidth={submitButton && Object.hasOwn(submitButton, 'fullWidth') ? submitButton.fullWidth : true}
                                        disabled={isSubmitting}
                                        type="submit"
                                    >
                                        {submitButton && submitButton.label ? submitButton.label : 'Добавяне'}
                                    </Button>
                                </Box>
                            </>
                        )}
                    </form>
                )
            }}
        </Formik >
    );
}

FormBuilder.propTypes = {
    fields: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
    ]).isRequired,
    initialValues: PropTypes.object,
    menus: PropTypes.array,
    validationSchema: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
    submitButton: PropTypes.object,
    enableReinitialize: PropTypes.bool,
    handleOnChange: PropTypes.func
};

export default FormBuilder;