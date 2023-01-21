import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { Box, Card } from '@mui/material';
import teacherService from '@services/teacher';
import subjectService from '@services/subject';
import FormBuilder from '@modules/common/components/FormBuilder';
import * as Yup from 'yup';
import useMessage from '@modules/common/hooks/useMessage';
import useAuth from '@modules/common/hooks/useAuth';

const TeachersAdd = () => {
    const { addMessage } = useMessage();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [subjectOptions, setSubjectOptions] = useState([]);

    useEffect(() => {
        if (user) {
            subjectService.getAll(user.info.id)
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
        name: Yup.string().max(255).required('Името на учителя е задължително'),
        email: Yup.string().email('Имейлът не е валиден').max(255).required('Имейлът е задължителен'),
        password: Yup.string().max(255).required('Паролата е задължителна').min(8, 'Паролата трябва да бъде поне 8 символа'),
        repeatPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Паролите не съвпадат'),
        subject: Yup.object().required('Предметът е задължителен')
    });

    const fields = [
        { type: 'text', name: 'name', label: 'Име на учителя' },
        { type: 'email', name: 'email', label: 'Имейл' },
        { type: 'password', name: 'password', label: 'Парола' },
        { type: 'password', name: 'repeatPassword', label: 'Повторете паролата' },
        { type: 'autocomplete', name: 'subject', label: 'Предмет', options: subjectOptions }
    ];

    const onSubmit = (values, { setSubmitting }) => {
        if (user) {
            teacherService.create(user.info.id, values)
                .then((res) => {
                    addMessage('Учителят е създаден успешно', 'success');
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

    return (
        <>
            <Helmet>
                <title>Създаване | Учители</title>
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
                            validationSchema={validationSchema}
                            onSubmit={onSubmit}
                        />
                    </Box>
                </Card>
            </Box>
        </>
    );
};

export default TeachersAdd;