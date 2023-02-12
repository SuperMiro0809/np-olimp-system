import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { Box, Card } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import groupService from '@services/group';
import groupLessonsService from '@services/groupLessons';
import FormBuilder from '@modules/common/components/FormBuilder';
import * as Yup from 'yup';
import useMessage from '@modules/common/hooks/useMessage';
import useAuth from '@modules/common/hooks/useAuth';
import isSameOrBefore from './utils/isSameOrBefore';

import GroupLessons from './FormFields/GroupLessons';

const LessonsAdd = () => {
    const { addMessage } = useMessage();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        if (user) {
            groupService.getAll(user.info.school_id, user.info.id)
                .then((res) => {
                    let options = [];

                    res.data.forEach((group) => {
                        options.push({ label: group.class, value: group.id });
                    })
                    setGroups(options)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }, [user]);

    const validationSchema = Yup.object().shape({
        groups: Yup.array().required('Групите са задължителни'),
        groupLessons: Yup.array().of(Yup.object().shape({
            lessons: Yup.array().of(Yup.object().shape({
                date: Yup.date().required('Датата е задължителна').typeError('Датата не е валидна'),
                label: Yup.string().required('Заглавието е задължително'),
                'time-range': Yup.object().shape({
                    start: Yup.string().test(
                        'not empty',
                        'Началният час е задължителен',
                        function (value) {
                            return !!value;
                        }
                    ).when('end', (end) => {
                        if (end) {
                            return Yup.string()
                                .test(
                                    'not empty',
                                    'Началният час е задължителен',
                                    function (value) {
                                        return !!value;
                                    }
                                ).test(
                                    'start and end time test',
                                    'Началният час трябва да е преди крайния',
                                    function (value) {
                                        return isSameOrBefore(value, end);
                                    }
                                );
                        }
                    }),
                    end: Yup.string().test(
                        'not empty',
                        'Крайният час е задължителен',
                        function (value) {
                            return !!value;
                        }
                    )
                })
            }))
        }))
    });

    const fields = [
        { type: 'autocomplete', name: 'groups', label: 'Групи', options: groups, multiple: true },
        { type: 'custom', component: GroupLessons }
    ];

    const onSubmit = (values, { setSubmitting }) => {
        if (user) {
            groupLessonsService.create(values, user.info.school_id, user.info.id)
                .then((res) => {
                    addMessage('Занятието е създадено успешно', 'success');
                    navigate('/app/lessons');
                })
                .catch((error) => {
                    console.log(error);
                    setSubmitting(false)
                })
        }
    }

    return (
        <>
            <Helmet>
                <title>Създаване | Занятия</title>
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
                                validationSchema={validationSchema}
                                onSubmit={onSubmit}
                                enableReinitialize
                            />
                        </Box>
                    </PerfectScrollbar>
                </Card>
            </Box>
        </>
    );
};

export default LessonsAdd;