import { Box, Typography } from '@mui/material';
import { FieldArray } from 'formik';
import ArrayCollapseItem from './ArrayCollapseItem';
import ArrayInlineItem from './ArrayInlineItem';

const ArrayField = ({ arrayVariant, element, itemLabel, fields, values, baseProps, ...otherProps }) => {
    const { name, label } = baseProps;

    return (
        <>
            <Box sx={{ mb: 1, mt: 2 }}>
                <Typography
                    color="textPrimary"
                    variant="h4"
                >
                    {label}
                </Typography>
            </Box>

            <FieldArray
                name={name}
                render={arrayHelpers => (
                    <>
                        {element.map((el, index) => {
                            if (arrayVariant === 'collapse') {
                                return (
                                    <ArrayCollapseItem
                                        arrayHelpers={arrayHelpers}
                                        element={element}
                                        name={name}
                                        itemLabel={itemLabel}
                                        fields={fields}
                                        baseProps={baseProps}
                                        index={index}
                                        values={values}
                                        key={index}
                                        {...otherProps}
                                    />
                                );
                            } else if (arrayVariant === 'inline') {
                                return (
                                    <ArrayInlineItem
                                        arrayHelpers={arrayHelpers}
                                        element={element}
                                        name={name}
                                        itemLabel={itemLabel}
                                        fields={fields}
                                        baseProps={baseProps}
                                        index={index}
                                        values={values}
                                        key={index}
                                        {...otherProps}
                                    />
                                );
                            }
                        })}
                    </>
                )}
            />
        </>
    );
}

export default ArrayField;