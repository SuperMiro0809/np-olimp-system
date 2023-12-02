import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Card, TextField, MenuItem } from '@mui/material';

import FormBuilder from '@modules/common/components/FormBuilder';
import useAuth from '@modules/common/hooks/useAuth';
import useMessage from '@modules/common/hooks/useMessage';
import getSchoolYear from '@modules/common/utils/getSchoolYear';
import downloadGroupReport from '@modules/reports/utils/downloadGroupReport';
import downloadTeacherReport from '@modules/reports/utils/downloadTeacherReport';

import * as Yup from 'yup';

import subjectService from '@services/subject';
import reportsService from '@services/reports';

import GroupFields from './FormFields/GroupFields';
import TeacherFields from './FormFields/TeacherFields';

import { generateReport } from './utils/generateReport';

const ReportsList = () => {
    const [type, setType] = useState('');
    const [subjects, setSubjects] = useState([]);
    const { user } = useAuth();
    const { addMessage } = useMessage();
    const schoolYear = getSchoolYear();

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

    const validationSchemaGroups = Yup.object().shape({
        subject: Yup.object().required('Предметът е задължителен').nullable(),
        groups: Yup.array().required('Групите са задължителни'),
    });

    const validationSchemaTeachers = Yup.object().shape({
        subject: Yup.object().required('Предметът е задължителен').nullable(),
        teachers: Yup.array().required('Учителите са задължителни'),
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
        const { all_lessons, per_teacher, per_group, per_months } = values;
        const options = [];

        if(all_lessons) {
            options.push('all_lessons');
        }

        if(per_teacher) {
            options.push('per_teacher');
        }

        if(per_group) {
            options.push('per_group');
        }

        if(per_months) {
            options.push('per_months');
        }

        const filters = [
            { label: 'schoolYear', value: schoolYear }
        ];

        reportsService.generate(user.info.id, values, filters)
            .then((res) => {
                const data = res.data;

                const reportData = generateReport(data, type, options);

                if(type === 'groups') {
                    downloadGroupReport(reportData, options);
                }else {
                    downloadTeacherReport(reportData, options);
                }

                addMessage('Справката е генерирана успешно', 'success');

                setSubmitting(false);
            })
            .catch((error) => {
                addMessage(error.message, 'error');
                setSubmitting(false);
            })
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
                                validationSchema={validationSchemaGroups}
                                onSubmit={onSubmit}
                                enableReinitialize
                                submitButton={submitButton}
                            />
                        )}

                        {type === 'teachers' && (
                            <FormBuilder
                                fields={teacherFields}
                                validationSchema={validationSchemaTeachers}
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