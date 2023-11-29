import { useState, useEffect } from 'react';
import teacherService from '@services/teacher';
import useAuth from '@modules/common/hooks/useAuth';
import useMessage from '@modules/common/hooks/useMessage';
import Fields from '@modules/common/components/FormBuilder/Fields';
import { getIn } from 'formik';

const TeacherFields = ({ formikProps }) => {
    const [teachers, setTeachers] = useState([]);

    const { user } = useAuth();
    const { addMessage } = useMessage();

    const { values, touched, errors } = formikProps;
    const { subject } = values;

    useEffect(() => {
        if (user && subject) {
            const schoolId = user.info.id;

            const filters = [
                { label: 'subject_id', value: subject.value }
            ];

            teacherService.getAll(schoolId, filters, {})
                .then((res) => {
                    const options = res.data.map(el => ({ label: el.name, value: el.id }));

                    setTeachers(options);
                })
                .catch((error) => {
                    addMessage(error.message, 'error');
                })
        }

    }, [user, subject]);

    const fields = [
        { type: 'autocomplete', name: 'teachers', label: 'Учители', options: teachers, multiple: true, freeSolo: false, noOptionsText: `Няма учители по ${subject.value}` },
        { type: 'checkbox', name: 'options', options: [{ label: 'Общ брой часове', value: 'all_lessons' }, { label: 'Часове по групи', value: 'per_group' }, { label: 'Часове по месеци', value: 'per_months' }] }
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
};

export default TeacherFields;