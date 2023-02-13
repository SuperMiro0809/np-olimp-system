import { useState } from 'react';
import {
    Box,
    ListItemText,
    Fab,
    Collapse
} from '@mui/material';
import { styled } from '@mui/styles';
import { getIn } from 'formik';
import dataScheme from '../../utils/dataScheme';
import { ExpandButton, ExpandWrapper } from '@modules/common/components/Expand';

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import Fields from '../index';

const ControlsWrapper = styled(Box)({
    padding: '10px 0'
});


const ArrayCollapseItem = ({
    arrayHelpers,
    element,
    name,
    itemLabel,
    fields,
    baseProps,
    index,
    formikProps,
    ...otherProps
}) => {
    const [open, setOpen] = useState(true);
    const { values, touched, errors } = formikProps;

    const onAdd = () => {
        arrayHelpers.push(dataScheme(fields));
    }

    const onRemove = (index) => {
        arrayHelpers.remove(index);
    }

    return (
        <Box>
            <ExpandWrapper>
                <ExpandButton sx={{ ml: 2, mb: !open ? 2 : 0 }} onClick={() => setOpen(!open)}>
                    {!open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    <ListItemText primary={itemLabel} />

                </ExpandButton>
                <ControlsWrapper sx={{ mb: !open ? 2 : 0 }}>
                    <Fab onClick={() => onAdd()} size='small' color='primary' aria-label='add'>
                        <AddIcon />
                    </Fab>
                    <Fab onClick={() => onRemove(index)} disabled={element.length == 1} sx={{ ml: 1 }} size='small' color='primary' aria-label='remove'>
                        <RemoveIcon />
                    </Fab>
                </ControlsWrapper>
            </ExpandWrapper>

            <Collapse in={open}>
                {fields.map((field, i) => {
                    const fieldName = name + '.' + index + '.' + field.name;

                    const props = {
                        ...baseProps,
                        label: field.label,
                        name: fieldName,
                        fullWidth: Object.hasOwn(field, 'fullWidth') ? field.fullWidth : true,
                        error: Boolean(
                            getIn(touched, fieldName) &&
                            getIn(errors, fieldName)
                        ),
                        margin: Object.hasOwn(field, 'margin') ? field.margin : 'normal',
                        value: element[index][field.name],
                        variant: Object.hasOwn(field, 'variant') ? field.variant : 'outlined',
                        helperText: getIn(touched, fieldName) && getIn(errors, fieldName),
                        disabled: Object.hasOwn(field, 'disabled') ? field.disabled : false,
                        element: element[index][field.name],
                        key: i
                    };

                    if(field.type === 'custom') {
                        const props = {
                            formikProps,
                            name: name,
                            parentIndex: index
                        };
                        const { component: Field } = field;

                        return (
                            <Field
                                {...props}
                                key={i}
                            />
                        );
                    }

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

export default ArrayCollapseItem;