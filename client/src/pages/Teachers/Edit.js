import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Card } from '@mui/material';
import teacherService from '@services/teacher';
import subjectService from '@services/subject';
import FormBuilder from '@modules/common/components/FormBuilder';
import * as Yup from 'yup';
import useMessage from '@modules/common/hooks/useMessage';
import useAuth from '@modules/common/hooks/useAuth';

const TeachersEdit = () => {
    const { addMessage } = useMessage();
    const { id } = useParams();
    const navigate = useNavigate();
    const [initialValues, setInitialValues] = useState({ name: '', email: '', subject: '' });
    const { user } = useAuth();
    const [subjectOptions, setSubjectOptions] = useState([]);

    useEffect(() => {
        if (user) {
            teacherService.getById(user.info.id, id)
                .then((res) => {
                    setInitialValues({
                        name: res.data.name,
                        email: res.data.email,
                        subject: res.data.subject_name && res.data.subject_id ? { label: res.data.subject_name, value: res.data.subject_id } : ''
                    })
                })
                .catch((error) => {
                    console.log(error)
                })

            subjectService.getAll(user.info.id)
                .then((res) => {
                    const options = res.data.map((el) => ({ label: el.name, value: el.id }));
                    setSubjectOptions(options);
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }, []);

    const validationSchema = Yup.object().shape({
        name: Yup.string().max(255).required('Името на учителя е задължително'),
        email: Yup.string().email('Имейлът не е валиден').max(255).required('Имейлът е задължителен'),
    });

    const fields = [
        { type: 'text', name: 'name', label: 'Име на учителя' },
        { type: 'email', name: 'email', label: 'Имейл' },
        { type: 'autocomplete', name: 'subject', label: 'Предмет', options: subjectOptions }
    ];

    const onSubmit = (values, { setSubmitting }) => {
        if (user) {
            teacherService.edit(user.info.id, values, id)
                .then((res) => {
                    addMessage('Учителят е редактиран успешно', 'success');
                    navigate('/app/teachers');
                })
                .catch((error) => {
                    if (error.response.status == 422) {
                        addMessage(error.response.data.errors[0], 'error');
                    }
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
                <title>Редактиране | Учители</title>
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
                            fields={fields}
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={onSubmit}
                            submitButton={submitButton}
                            enableReinitialize
                        />
                    </Box>
                </Card>
            </Box>
        </>
    );
};

export default TeachersEdit;