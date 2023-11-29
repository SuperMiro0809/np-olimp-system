import { useEffect, useState } from 'react';
import groupService from '@services/group';
import useAuth from '@modules/common/hooks/useAuth';
import useMessage from '@modules/common/hooks/useMessage';
import Fields from '@modules/common/components/FormBuilder/Fields';
import getSchoolYear from '@modules/common/utils/getSchoolYear';
import { getIn } from 'formik';

const GroupFields = ({
    formikProps,
    name = '',
    parentIndex = null
}) => {
    const { user } = useAuth();
    const { addMessage } = useMessage();

    const schoolYear = getSchoolYear();

    const {
        values,
        touched,
        errors,
    } = formikProps;

    const subject = values.subject;

    const [groups, setGroups] = useState([]);

    useEffect(() => {
        if (user && subject.value) {
            const schoolId = user.info.id;

            const filters = [
                { label: 'subject', value: subject.value },
                { label: 'approved', value: 1 },
                { label: 'schoolYear', value: schoolYear }
            ];

            groupService.getAllBySchool(schoolId, filters)
                .then((res) => {
                    const options = res.data.map(group => ({ label: group.class, value: group.id }));

                    setGroups(options);
                })
                .catch((error) => {
                    addMessage(error.message, 'error');
                })
        }

    }, [subject, user])

    const fields = [
        { type: 'autocomplete', label: 'Групи', name: 'groups', options: groups, multiple: true, freeSolo: false, noOptionsText: `Няма активни групи за учебната ${schoolYear} по предмет ${subject.label}` },
        { type: 'checkbox', label: 'test', name: 'options', options: [ { label: 'Общ брой часове', value: 'all_lessons' }, { label: 'Часове по учител', value: 'per_teacher' } ] }
    ]

    return (
        <>
            {subject && fields.map((field, i) => {
                const props = {
                    label: field.label,
                    name: field.name,
                    error: Boolean(
                        getIn(touched, field.name) &&
                        getIn(errors, field.name)
                    ),
                    margin: Object.hasOwn(field, 'margin') ? field.margin : 'normal',
                    value: values[field.name],
                    variant: Object.hasOwn(field, 'variant') ? field.variant : 'outlined',
                    helperText: getIn(touched, field.name) && getIn(errors, field.name),
                    element: values[field.name],
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
        </>
    );
}

export default GroupFields;