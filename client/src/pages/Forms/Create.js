import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { Box, Card } from '@mui/material';
import subjectService from '@services/subject';
import trainingOrganizationsService from '@services/trainingOrganizations';
import FormBuilder from '@modules/common/components/FormBuilder';
import * as Yup from 'yup';
import useMessage from '@modules/common/hooks/useMessage';
import useAuth from '@modules/common/hooks/useAuth';

import InfoIcon from '@mui/icons-material/Info';
import GroupsIcon from '@mui/icons-material/Groups';

const FormsAdd = () => {
    const { addMessage } = useMessage();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [initialValues, setInitialValues] = useState({});
    const [subjectOptions, setSubjectOptions] = useState([]);

    useEffect(() => {
        if (user) {
            trainingOrganizationsService.getById(user.info.school_id)
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

            subjectService.getAll(user.info.school_id)
                .then((res) => {
                    const options = res.data.map((el) => ({ label: el.name, value: el.id }));
                    setSubjectOptions(options);
                })
                .catch((error) => {
                    console.log(error)
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
        subject: Yup.object().required('Предметът е задължителен')
    });

    const menus = [
        { id: 'information', label: 'Данни за формуляра', icon: InfoIcon },
        { id: 'groups', label: 'Групи', icon: GroupsIcon }
    ]

    const fields = {
        'information': [
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
            { type: 'text', name: 'director', label: 'Директор' },
            { type: 'autocomplete', name: 'subject', label: 'Предмет', options: subjectOptions }
        ],
        'groups': [

        ]
    };

    const onSubmit = (values, { setSubmitting }) => {
        console.log(values)
    }

    return (
        <>
            <Helmet>
                <title>Създаване | Формуляри</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    py: 3
                }}
            >
                <Card sx={{ p: 2 }}>
                    <Box>
                        <FormBuilder
                            menus={menus}
                            initialValues={initialValues}
                            fields={fields}
                            validationSchema={validationSchema}
                            onSubmit={onSubmit}
                            enableReinitialize
                        />
                    </Box>
                </Card>
            </Box>
        </>
    );
};

export default FormsAdd;