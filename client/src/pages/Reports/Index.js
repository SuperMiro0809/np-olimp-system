import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Card, TextField, MenuItem } from '@mui/material';

import FormBuilder from '@modules/common/components/FormBuilder';
import useAuth from '@modules/common/hooks/useAuth';

import * as Yup from 'yup';

import subjectService from '@services/subject';

import GroupFields from './FormFields/GroupFields';
import TeacherFields from './FormFields/TeacherFields';

const ReportsList = () => {
    const [type, setType] = useState('');
    const [subjects, setSubjects] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            const schoolId = user.info.id;

            subjectService.getAll(schoolId)
                .then((res) => {
                    const options = res.data.map(el => ({ label: el.name, value: el.id }));
                    setSubjects(options);
                })
        }
    }, [user]);

    const validationSchema = Yup.object().shape({
        subject: Yup.object().required('Предметът е задължителен').nullable(),
        groups: Yup.array().required('Групите са задължителни'),
    });

    const groupFields = [
        { type: 'autocomplete', name: 'subject', label: 'Предмет', options: subjects },
        { type: 'custom', component: GroupFields }
    ];

    const teacherFields = [
        { type: 'autocomplete', name: 'subject', label: 'Предмет', options: subjects },
        { type: 'custom', component: TeacherFields }
    ];

    const onSubmit = (values, { setSubmitting }) => {
        console.log(values)
    };

    const submitButton = {
        label: 'Генерирай'
    }

    return (
        <>
            <Helmet>
                <title>Справки</title>
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
                        <TextField
                            select
                            name='type'
                            label='Справка по'
                            onChange={(event) => setType(event.target.value)}
                            defaultValue={'choose'}
                            fullWidth
                        >
                            <MenuItem value='choose' disabled>Избери</MenuItem>
                            <MenuItem value='groups'>Групи</MenuItem>
                            <MenuItem value='teachers'>Учители</MenuItem>
                        </TextField>

                        {type === 'groups' && (
                            <FormBuilder
                                fields={groupFields}
                                validationSchema={validationSchema}
                                onSubmit={onSubmit}
                                enableReinitialize
                                submitButton={submitButton}
                            />
                        )}

                        {type === 'teachers' && (
                            <FormBuilder
                                fields={teacherFields}
                                validationSchema={validationSchema}
                                onSubmit={onSubmit}
                                enableReinitialize
                                submitButton={submitButton}
                            />
                        )}
                    </Box>
                </Card>
            </Box>
        </>
    );
};

export default ReportsList;