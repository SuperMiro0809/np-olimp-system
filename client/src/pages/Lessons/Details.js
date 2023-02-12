import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useNavigate } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Box, Card, Button } from '@mui/material';
import FormBuilder from '@modules/common/components/FormBuilder';
import * as Yup from 'yup';
import groupLessonsService from '@services/groupLessons';
import useAuth from '@modules/common/hooks/useAuth';
import useMessage from '@modules/common/hooks/useMessage';
import isSameOrBefore from './utils/isSameOrBefore';

const LessonDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const { addMessage } = useMessage();
    const navigate = useNavigate();
    const [initialValues, setInitialValues] = useState({
        date: '',
        label: '',
        'time-range': { start: '', end: '' }
    });

    useEffect(() => {
        if (user) {
            groupLessonsService.getById(user.info.school_id, user.info.id, id)
                .then((res) => {
                    setInitialValues({
                        date: res.data.date,
                        label: res.data.label,
                        'time-range': {
                            start: res.data.startHour,
                            end: res.data.endHour
                        }
                    });
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }, [])

    const validationSchema = Yup.object().shape({
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
    });

    const fields = [
        { type: 'date', name: 'date', label: 'Дата' },
        { type: 'text', name: 'label', label: 'Заглавие' },
        {
            type: 'time-range', name: 'time-range', fields: [
                { type: 'time', name: 'start', label: 'От' },
                { type: 'time', name: 'end', label: 'До' },
            ]
        }
    ];

    const onSubmit = (values, { setSubmitting }) => {
        if (user) {
            const data = {
                ...values,
                startHour: values['time-range'].start,
                endHour: values['time-range'].end
            }

            groupLessonsService.edit(data, user.info.school_id, user.info.id, id)
                .then((res) => {
                    addMessage('Занятието е редактирано успешно', 'success');
                    navigate('/app/lessons');
                })
                .catch((error) => {
                    console.log(error);
                    setSubmitting(false);
                })
        }
    }

    const submitButton = {
        label: 'Редактиране'
    }

    return (
        <>
            <Helmet>
                <title>Детайли | Занятия</title>
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
                            {/* <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mb: 3 }}>
                                <Button
                                    component={RouterLink}
                                    variant='contained'
                                    color='lightBlue'
                                    textcolor='lightBlue'
                                    startIcon={<AddIcon />}
                                    to='create'
                                >
                                    Добави
                                </Button>
                            </Box> */}

                            <FormBuilder
                                fields={fields}
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={onSubmit}
                                submitButton={submitButton}
                                enableReinitialize
                            />
                        </Box>
                    </PerfectScrollbar>
                </Card>
            </Box>
        </>
    );
}

export default LessonDetails;