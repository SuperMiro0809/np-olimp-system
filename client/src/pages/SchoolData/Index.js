import { useEffect, useState } from 'react';
import { Box, Card } from '@mui/material';
import { Helmet } from 'react-helmet';
import PerfectScrollbar from 'react-perfect-scrollbar';
import * as Yup from 'yup';
import FormBuilder from "@modules/common/components/FormBuilder";
import useAuth from '@modules/common/hooks/useAuth';
import useMessage from '@modules/common/hooks/useMessage';
import trainingOrganizationsService from '@services/trainingOrganizations';

const SchoolData = () => {
    const { user } = useAuth();
    const { addMessage } = useMessage();
    const [initialValues, setInitialValues] = useState({});

    useEffect(() => {
        if (user) {
            trainingOrganizationsService.getById(user.info.id)
                .then((res) => {
                    setInitialValues({
                        fullName: res.data.fullName || '',
                        type: res.data.type || '',
                        key: res.data.key,
                        address: {
                            address: res.data.address,
                            phone: res.data.school_phone || '',
                            email: res.data.school_email || ''
                        },
                        contact: {
                            name: res.data.contact_name || '',
                            phone: res.data.contact_phone || '',
                            email: res.data.contact_email || ''
                        },
                        director: res.data.director || ''
                    });
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }, [user])

    const validationSchema = Yup.object().shape({
        fullName: Yup.string().max(255).required('Пълното име е задължително'),
        type: Yup.string().required('Tипът е задължителен'),
        key: Yup.string().max(255).required('Кодът по НЕИСПУО е задължителен'),
        address: Yup.object().shape({
            address: Yup.string().required('Адресът е задължителен'),
            phone: Yup.string().required('Телефонът е задължителен'),
            email: Yup.string().email('Имейлът не е валиден').max(255).required('Имейлът е задължителен')
        }),
        contact: Yup.object().shape({
            name: Yup.string().required('Името е задължително'),
            phone: Yup.string().required('Телефонът е задължителен'),
            email: Yup.string().email('Имейлът не е валиден').max(255).required('Имейлът е задължителен')
        }),
        director: Yup.string().max(255).required('Директорът е задължителен'),
    });

    const fields = [
        { type: 'text', name: 'fullName', label: 'Пълно име' },
        {
            type: 'select', name: 'type', label: 'Tип', options: [
                { label: 'Държавно', value: 'Държавно' },
                { label: 'Общинско', value: 'Общинско' },
                { label: 'Частно ', value: 'Частно ' }
            ]
        },
        { type: 'text', name: 'key', label: 'Код по НЕИСПУО' },
        {
            type: 'group', name: 'address', title: 'Aдрес за кореспонденция', fields: [
                { type: 'text', name: 'address', label: 'Адрес' },
                { type: 'text', name: 'phone', label: 'Телефон' },
                { type: 'email', name: 'email', label: 'Имейл' },
            ]
        },
        {
            type: 'group', name: 'contact', title: 'Лице за контакти', fields: [
                { type: 'text', name: 'name', label: 'Име' },
                { type: 'text', name: 'phone', label: 'Телефон' },
                { type: 'email', name: 'email', label: 'Имейл' },
            ]
        },
        { type: 'text', name: 'director', label: 'Директор' }
    ];

    const onSubmit = (values, { setSubmitting }) => {
        trainingOrganizationsService.editSchoolData(values, user.info.id)
            .then((res) => {
                addMessage('Данните за училището са запазени успешно', 'success');
                setSubmitting(false);
            })
            .catch((error) => {
                if (error.response.status == 422) {
                    addMessage(error.response.data.errors[0], 'error');
                }
                setSubmitting(false);
            })
    }

    const submitButton = {
        label: 'Запази'
    }

    return (
        <>
            <Helmet>
                <title>Данни за училището</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    py: 3
                }}
            >
                <Card sx={{ p: 2 }}>
                    <PerfectScrollbar>
                        <Box>
                            <FormBuilder
                                fields={fields}
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                submitButton={submitButton}
                                onSubmit={onSubmit}
                                enableReinitialize
                            />
                        </Box>
                    </PerfectScrollbar>
                </Card>
            </Box>
        </>
    );
}

export default SchoolData;