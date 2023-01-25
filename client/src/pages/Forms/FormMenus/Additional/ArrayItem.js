import { useState } from 'react';
import {
    Box,
    ListItemButton,
    ListItemText,
    Collapse
} from '@mui/material';
import { styled } from '@mui/styles';
import { getIn } from 'formik';

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Fields from '@modules/common/components/FormBuilder/Fields';

const ExpandWrapper = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    borderTop: '1px solid rgba(0, 0, 0, 0.12)'
});

const ExpandButton = styled(ListItemButton)({
    paddingLeft: 0,
    paddingTop: '10px',
    paddingBottom: '10px',
    marginLeft: 0,
    '&:hover': {
        backgroundColor: 'transparent',
    }
});

const ArrayItem = ({
    arrayHelpers,
    current,
    teachers,
    element,
    fields,
    index,
    values,
    ...otherProps
}) => {
    const [open, setOpen] = useState(true);
    const name = 'letters';

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
                            getIn(otherProps.touched, fieldName) &&
                            getIn(otherProps.errors, fieldName)
                        ),
                        margin: Object.hasOwn(field, 'margin') ? field.margin : 'normal',
                        value: values[name][index][field.name],
                        variant: Object.hasOwn(field, 'variant') ? field.variant : 'outlined',
                        helperText: getIn(otherProps.touched, fieldName) && getIn(otherProps.errors, fieldName),
                        element: values[name][index][field.name],
                        key: i
                    };

                    return (
                        <Fields
                            field={field}
                            baseProps={props}
                            key={field.name}
                            values={values}
                            touched={otherProps.touched}
                            errors={otherProps.errors}
                            setFieldValue={otherProps.setFieldValue}
                        />
                    );
                })}
            </Collapse>
        </Box>
    );
}

export default ArrayItem;