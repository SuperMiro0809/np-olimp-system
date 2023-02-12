import { useState, useEffect } from 'react';
import {
    Box,
    ListItemButton,
    ListItemText,
    Collapse
} from '@mui/material';
import { getIn } from 'formik';
import { styled } from '@mui/styles';

import Fields from '@modules/common/components/FormBuilder/Fields';

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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

const GroupItem = ({
    current,
    formikProps,
    index
}) => {
    const [open, setOpen] = useState(true);
    const name = 'groupLessons';
    const {
        values,
        touched,
        errors,
        setFieldValue
    } = formikProps;

    useEffect(() => {
        if (values.groups) {
            const lessons = [];

            values.groups.forEach((group) => {
                lessons.push({
                    group_id: group.value, lessons: [
                        { date: '', 'time-range': { start: '', end: '' } }
                    ]
                })
            })

            setFieldValue('groupLessons', lessons)
        }

    }, [values.groups])

    const fields = [
        {
            type: 'array', arrayVariant: 'collapse', name: 'lessons', label: 'Занятия', itemLabel: 'Занятие', fields: [
                { type: 'date', name: 'date', label: 'Дата' },
                {
                    type: 'time-range', name: 'time-range', fields: [
                        { type: 'time', name: 'start', label: 'От' },
                        { type: 'time', name: 'end', label: 'До' },
                    ]
                }
            ]
        }
    ];


    return (
        <Box>
            <ExpandWrapper>
                <ExpandButton sx={{ ml: 2, mb: !open ? 2 : 0 }} onClick={() => setOpen(!open)}>
                    {!open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    <ListItemText primary={current.label} />
                </ExpandButton>
            </ExpandWrapper>

            <Collapse in={open}>
                {values[name] && values[name].length === values.groups.length && fields.map((field, i) => {
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

export default GroupItem;