import { useState } from 'react';
import {
    Box,
    ListItemText,
    Collapse
} from '@mui/material';
import { getIn } from 'formik';
import { ExpandButton, ExpandWrapper } from '@modules/common/components/Expand';

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Fields from '@modules/common/components/FormBuilder/Fields';

const ArrayItem = ({
    arrayHelpers,
    current,
    teachers,
    element,
    fields,
    index,
    formikProps
}) => {
    const [open, setOpen] = useState(true);
    const name = 'letters';
    const {
        values,
        touched,
        errors
    } = formikProps;

    return (
        <Box>
            <ExpandWrapper>
                <ExpandButton sx={{ ml: 2, mb: !open ? 2 : 0 }} onClick={() => setOpen(!open)}>
                    {!open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    <ListItemText primary={current.label} />
                </ExpandButton>
            </ExpandWrapper>

            <Collapse in={open}>
                {fields.map((field, i) => {
                    const fieldName = name + '.' + index + '.' + field.name;

                    const props = {
                        label: field.label,
                        name: fieldName,
                        fullWidth: Object.hasOwn(field, 'fullWidth') ? field.fullWidth : true,
                        error: Boolean(
                            getIn(touched, fieldName) &&
                            getIn(errors, fieldName)
                        ),
                        margin: Object.hasOwn(field, 'margin') ? field.margin : 'normal',
                        value: values[name][index][field.name],
                        variant: Object.hasOwn(field, 'variant') ? field.variant : 'outlined',
                        helperText: getIn(touched, fieldName) && getIn(errors, fieldName),
                        element: values[name][index][field.name],
                        key: i
                    };

                    return (
                        <Fields
                            field={field}
                            baseProps={props}
                            formikProps={formikProps}
                            key={field.name}
                        />
                    );
                })}
            </Collapse>
        </Box>
    );
}

export default ArrayItem;