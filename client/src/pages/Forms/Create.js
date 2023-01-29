import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { Box, Card } from '@mui/material';
import subjectService from '@services/subject';
import trainingOrganizationsService from '@services/trainingOrganizations';
import teacherService from '@services/teacher';
import FormBuilder from '@modules/common/components/FormBuilder';
import * as Yup from 'yup';
import useMessage from '@modules/common/hooks/useMessage';
import useAuth from '@modules/common/hooks/useAuth';

import InfoIcon from '@mui/icons-material/Info';
import GroupsIcon from '@mui/icons-material/Groups';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import PaidIcon from '@mui/icons-material/Paid';
import MoreIcon from '@mui/icons-material/More';

import Additional from './FormMenus/Additional';
import Budget from './FormMenus/Budget';

const FormsAdd = () => {
    const { addMessage } = useMessage();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [initialValues, setInitialValues] = useState({});
    const [subjectOptions, setSubjectOptions] = useState([]);
    const [teacherOptions, setTeacherOptions] = useState([]);
    const [subjectId, setSubjectId] = useState(null);
    const [selectedTeachers, setSelectedTeachers] = useState([]);

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

    useEffect(() => {
        if (subjectId) {
            console.log('test')
            const filters = [
                //{ label: 'active', value: 1 },
                //{ label: 'subject_id', value: subjectId }
            ];

            teacherService.getAll(user.info.school_id, filters, {})
                .then((res) => {
                    const options = res.data.map((el) => ({ label: el.name, value: el.id }));
                    setTeacherOptions(options);
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }, [subjectId])

    const validationSchema = Yup.object().shape({
        // fullName: Yup.string().max(255).required('Пълното име е задължително'),
        // type: Yup.string().required('Tипът е задължителен'),
        // key: Yup.string().max(255).required('Кодът по НЕИСПУО е задължителен'),
        // address: Yup.object().shape({
        //     address: Yup.string().required('Адресът е задължителен'),
        //     phone: Yup.string().required('Телефонът е задължителен'),
        //     email: Yup.string().email('Имейлът не е валиден').max(255).required('Имейлът е задължителен')
        // }),
        // contact: Yup.object().shape({
        //     name: Yup.string().required('Името е задължително'),
        //     phone: Yup.string().required('Телефонът е задължителен'),
        //     email: Yup.string().email('Имейлът не е валиден').max(255).required('Имейлът е задължителен')
        // }),
        // director: Yup.string().max(255).required('Директорът е задължителен'),
        // subject: Yup.object().required('Предметът е задължителен'),
        // activities: Yup.array().of(Yup.object().shape({
        //     date: Yup.date().required('dsd')
        // }))
    });

    const menus = [
        { id: 'information', label: 'Данни за формуляра', icon: InfoIcon },
        { id: 'groups', label: 'Групи', icon: GroupsIcon },
        { id: 'description', label: 'Описание на проекта', icon: TextSnippetIcon },
        { id: 'budget', label: 'Бюджет', icon: PaidIcon },
        { id: 'additional', label: 'Допълнителни приложения', icon: MoreIcon },
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
            { type: 'autocomplete', name: 'subject', label: 'Предмет', options: subjectOptions },
        ],
        'groups': [
            {
                type: 'array', arrayVariant: 'collapse', name: 'groups', label: 'Групи', itemLabel: 'Група', fields: [
                    { type: 'autocomplete', name: 'teachers', label: 'Учители', options: teacherOptions, multiple: true },
                    { type: 'text', name: 'class', label: 'Клас' },
                    { type: 'number', name: 'lessons', label: 'Часове' },
                    {
                        type: 'array', arrayVariant: 'inline', name: 'students', label: 'Ученици', labelVariant: 'h5', itemLabel: 'Ученик', fields: [
                            { type: 'text', name: 'name', label: 'Име' },
                            {
                                type: 'select', name: 'class', label: 'Клас', options: [
                                    { label: '5', value: '5' },
                                    { label: '6', value: '6' },
                                    { label: '7', value: '7' },
                                    { label: '8', value: '8' },
                                    { label: '9', value: '9' },
                                    { label: '10', value: '10' },
                                    { label: '11', value: '11' },
                                    { label: '12', value: '12' },
                                ]
                            }
                        ]
                    },
                    {
                        type: 'array', arrayVariant: 'inline', name: 'program', label: 'Програма', labelVariant: 'h5', itemLabel: 'Ученик', fields: [
                            { type: 'text', name: 'theme', label: 'Тема' },
                            { type: 'number', name: 'allLessons', label: 'Брой учебни часове' },
                            { type: 'number', name: 'allLessons', label: 'Мирослава Николова' },
                            { type: 'number', name: 'allLessons', label: 'Екатерина Мицева' },
                        ]
                    }
                ]
            }
        ],
        'description': [
            { type: 'multiline', name: 'description', label: 'Обосновка на проекта' },
            { type: 'multiline', name: 'goals', label: 'Oсновни цели' },
            { type: 'multiline', name: 'results', label: 'Основни резултати' },
            {
                type: 'array', arrayVariant: 'inline', name: 'activities', label: 'Основни дейности', labelVariant: 'h5', itemLabel: 'Дейност', fields: [
                    { type: 'text', name: 'activity', label: 'Дейност' },
                    { type: 'autocomplete', name: 'teachers', label: 'Изпълнители', options: selectedTeachers, multiple: true },
                    { type: 'date', name: 'date', label: 'Дата/срок' },
                ]
            },
            { type: 'multiline', name: 'results', label: 'Индикатори за успех' },
            { type: 'multiline', name: 'results', label: 'Ресурси за проекта' },
        ],
        'budget': Budget,
        'additional': Additional
    };

    const onChange = (values) => {
        if (values.subject) {
            setSubjectId(values.subject.value);
        }

        if (values.groups) {
            let teachersArray = [];

            values.groups.forEach((group) => {
                if (Array.isArray(group.teachers)) {
                    group.teachers.forEach((teacher) => {
                        teachersArray.push(teacher);
                    })
                }
            });

            setSelectedTeachers(teachersArray);
        }
    }

    const onSubmit = (values, { setSubmitting }) => {
        console.log(values)
        setSubmitting(false);
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
                            handleOnChange={onChange}
                            enableReinitialize
                        />
                    </Box>
                </Card>
            </Box>
        </>
    );
};

export default FormsAdd;