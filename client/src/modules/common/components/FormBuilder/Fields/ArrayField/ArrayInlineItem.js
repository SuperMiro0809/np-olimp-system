import {
    Box,
    Fab,
} from '@mui/material';
import { styled } from '@mui/styles';
import { getIn } from 'formik';
import dataScheme from '../../utils/dataScheme';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import Fields from '../index';

const ControlsWrapper = styled(Box)({
    padding: '10px 0'
});

const ArrayInlineItem = ({
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
    const { touched, errors } = formikProps;

    const onAdd = () => {
        arrayHelpers.push(dataScheme(fields));
    }

    const onRemove = (index) => {
        arrayHelpers.remove(index);
    }

    return (
        <Box sx={{
            display: 'flex',
            gap: 3,
            alignItems: 'center'
        }}>
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
                    //helperText: getIn(otherProps.touched, fieldName) && getIn(otherProps.errors, fieldName),
                    disabled: Object.hasOwn(field, 'disabled') ? field.disabled : false,
                    helperText: null,
                    element: element[index][field.name],
                    key: i
                };

                if (field.type === 'custom') {
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
                    <Box sx={{ flexGrow: 1 }} key={i}>
                        <Fields
                            field={field}
                            baseProps={props}
                            formikProps={formikProps}
                            key={field.name}
                        />
                    </Box>
                );
            })}
            <ControlsWrapper sx={{ mb: !open ? 2 : 0 }}>
                <Fab onClick={() => onAdd()} size='small' color='primary' aria-label='add'>
                    <AddIcon />
                </Fab>
                <Fab onClick={() => onRemove(index)} disabled={element.length == 1} sx={{ ml: 1 }} size='small' color='primary' aria-label='remove'>
                    <RemoveIcon />
                </Fab>
            </ControlsWrapper>
        </Box>
    );
}

export default ArrayInlineItem;