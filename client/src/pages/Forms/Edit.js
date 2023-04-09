import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Card } from '@mui/material';
import subjectService from '@services/subject';
import trainingOrganizationsService from '@services/trainingOrganizations';
import teacherService from '@services/teacher';
import formService from '@services/form';
import FormBuilder from '@modules/common/components/FormBuilder';
import * as Yup from 'yup';
import useMessage from '@modules/common/hooks/useMessage';
import useAuth from '@modules/common/hooks/useAuth';
import formData from '@modules/common/components/FormBuilder/utils/formData';
import getSchoolYear from '@modules/common/utils/getSchoolYear';

import InfoIcon from '@mui/icons-material/Info';
import GroupsIcon from '@mui/icons-material/Groups';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import PaidIcon from '@mui/icons-material/Paid';
import MoreIcon from '@mui/icons-material/More';

import Additional from './FormMenus/Additional';
import Budget from './FormMenus/Budget';
import SchoolProgram from './FormFields/SchoolProgram';

import servicesHelper from '@services';

const FormsEdit = () => {
    const { id } = useParams();
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
            formService.getById(user.info.school_id, id)
                .then((res) => {
                    const form = res.data;
                    const schoolInfo = form.school_info;
                    const description = form.description;
                    const budget = form.budget;

                    console.log(res.data)
                    setInitialValues({
                        schoolYear: form.schoolYear,
                        fullName: schoolInfo.fullName,
                        type: schoolInfo.type,
                        key: schoolInfo.key,
                        address: {
                            address: schoolInfo.address.address,
                            phone: schoolInfo.address.phone,
                            email: schoolInfo.address.email
                        },
                        contact: {
                            name: schoolInfo.contact.name,
                            phone: schoolInfo.contact.phone,
                            email: schoolInfo.contact.email
                        },
                        director: schoolInfo.director,
                        subject: { label: form.subject_name, value: form.subject_id },
                        groups: form.groups.map((group) => {

                            return {
                                teachers: group.teachers.map((teacher) => ({ label: teacher.name, value: teacher.teacher_id })),
                                class: group.class,
                                lessons: group.lessons,
                                students: group.students.map((student) => ({ name: student.name, class: student.class })),
                                program: group.program.map((program) => {
                                    return {
                                        theme: program.theme,
                                        allLessons: program.lessons,
                                        teachers: program.teachers.map((teacher) => ({ teacher_id: teacher.teacher_id, lessons: teacher.lessons }))
                                    }
                                })
                            };
                        }),
                        description: description.description,
                        goals: description.goals,
                        results: description.results,
                        activities: description.activities.map((activity) => {
                            return {
                                activity: activity.activity,
                                teachers: activity.teachers.map((teacher) => ({ label: teacher.name, value: teacher.teacher_id })),
                                date: activity.date
                            };
                        }),
                        indicatorsOfSuccess: description.indicatorsOfSuccess,
                        resources: description.resources,
                        budget: {
                            hourPrice: budget.hourPrice
                        },
                        declarations: form.declarations.map((declaration) => {
                            const name = declaration.path.split('/').pop();
                            const file = new File([`${process.env.REACT_APP_ASSETS}/${declaration.path}`], name);

                            return file;
                        })
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
            const filters = [
                { label: 'active', value: 1 },
                { label: 'subject_id', value: subjectId }
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
        subject: Yup.object().required('Предметът е задължителен'),
        activities: Yup.array().of(Yup.object().shape({
            date: Yup.date().required('dsd')
        })),
        groups: Yup.array().of(Yup.object().shape({
            teachers: Yup.array().required('Учителите са задъкжителни'),
            class: Yup.string().required('Класът е задължителен'),
            lessons: Yup.number().required('Часовете за задължителни').min(50, 'Часовете трябва да са поне 50').when('program', (program) => {
                let lessons = 0;

                program.forEach((el) => {
                    if (el.allLessons) {
                        lessons += el.allLessons
                    }
                });

                if (lessons) {
                    return Yup.number().required('Часовете за задължителни').min(50, 'Часовете трвбва да са поне 50').test({
                        message: 'Броят часове не съвпада със сбора от часовете по теми',
                        test: (value) => {
                            return value === lessons
                        }
                    })
                }
            }),
            students: Yup.array().of(Yup.object().shape({
                name: Yup.string().required('Името на ученика е задължително'),
                class: Yup.string().required('Класът на ученика е задължителен')
            })),
            program: Yup.array().of(Yup.object().shape({
                theme: Yup.string().required('Темата е задължителна'),
                allLessons: Yup.number().required('Броят учебни часове е задължителен').min(1, 'Броят учебни часове трябва е поне 1').when('teachers', (teachers) => {
                    if (teachers) {
                        let lessons = 0;

                        teachers.forEach((teacher) => {
                            if (teacher.lessons) {
                                lessons += teacher.lessons
                            }
                        });

                        if (lessons) {
                            return Yup.number().required('Броят учебни часове е задължителен').min(1, 'Броят учебни часове трябва е поне 1').test({
                                message: 'Броят учебни часове не съвпада със сбора от часовете за учители',
                                test: (value) => {
                                    return value === lessons
                                }
                            })
                        }
                    }
                }),
                teachers: Yup.array().of(Yup.object().shape({
                    lessons: Yup.number().required('Учебните часове на учителя са задължителни').min(1, 'Учебните часове на учителя трябва да са поне 1')
                })).required('Учителите са задължителни')
            }))
        })),
        description: Yup.string().required('Обосновката на проекта е задължителна'),
        goals: Yup.string().required('Основните цели са задължителни'),
        results: Yup.string().required('Основните резултати са задължителни'),
        activities: Yup.array().of(Yup.object().shape({
            activity: Yup.string().required('Дейността е задължителна'),
            teachers: Yup.array().required('Изпълнителите са задължителни'),
            date: Yup.string().required('Датата е задължителна')
        })),
        indicatorsOfSuccess: Yup.string().required('Индикаторите за успех са задължителни'),
        resources: Yup.string().required('Ресурсите за проекта са задължителни'),
        budget: Yup.object().shape({
            hourPrice: Yup.number().required('Цената на час е задължителна').min(10, 'Цената на час не може да бъде по-ниска от 10 лв.').max(25, 'Цената на час не може да надвишава 25 лв.')
        })
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
            { type: 'text', name: 'schoolYear', label: 'Учебна година', disabled: true },
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
                    { type: 'email', name: 'email', label: 'Имейл' }
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
            { type: 'autocomplete', name: 'subject', label: 'Предмет', options: subjectOptions, disabled: true },
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
                            { type: 'custom', component: SchoolProgram }
                        ]
                    },
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
                    { type: 'text', name: 'date', label: 'Дата/срок' },
                ]
            },
            { type: 'multiline', name: 'indicatorsOfSuccess', label: 'Индикатори за успех' },
            { type: 'multiline', name: 'resources', label: 'Ресурси за проекта' },
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
                        const t = teachersArray.find(obj => {
                            return obj.value === teacher.value
                        });

                        if (!t) {
                            teachersArray.push(teacher);
                        }
                    })
                }
            });

            setSelectedTeachers(teachersArray);
        }
    }

    const onSubmit = (values, { setSubmitting }) => {
        const data = formData(values, [], ['declarations']);

        values.letters.forEach(function (obj, index) {
            obj.files.forEach((file) => {
                data.append("lettersFiles[" + index + "][files][]", file);
            })
        });

        // formService.create(user.info.school_id, data)
        //     .then((res) => {
        //         addMessage('Формулярът е създаден успешно', 'success');
        //         navigate('/app/forms');
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     })

        setSubmitting(false);
    }

    return (
        <>
            <Helmet>
                <title>Редактиране | Формуляри</title>
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
}

export default FormsEdit;