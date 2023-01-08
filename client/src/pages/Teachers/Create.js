import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { Box, Card } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import teacherService from '@services/teacher';
import FormBuilder from '@modules/common/components/FormBuilder';
import * as Yup from 'yup';
import useMessage from '@modules/common/hooks/useMessage';

const TeachersAdd = () => {
    const { addMessage } = useMessage();
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        name: Yup.string().max(255).required('Името на учителя е задължително'),
        email: Yup.string().email('Имейлът не е валиден').max(255).required('Имейлът е задължителен'),
        password: Yup.string().max(255).required('Паролата е задължителна').min(8, 'Паролата трябва да бъде поне 8 символа'),
        repeatPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Паролите не съвпадат'),
    });

    const fields = [
        { type: 'text', name: 'name', label: 'Име на учителя' },
        { type: 'email', name: 'email', label: 'Имейл' },
        { type: 'password', name: 'password', label: 'Парола' },
        { type: 'password', name: 'repeatPassword', label: 'Повторете паролата' },
    ];

    const onSubmit = (values, { setSubmitting }) => {
        teacherService.create(values)
            .then((res) => {
                addMessage('Учителят е създаден успешно', 'success');
                navigate('/app/teachers');
            })
            .catch((error) => {
                if(error.response.status == 422) {
                    addMessage(error.response.data.errors[0], 'error');
                }
                setSubmitting(false);
            })
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
                    <PerfectScrollbar>
                        <Box>
                            <FormBuilder
                                fields={fields}
                                validationSchema={validationSchema}
                                onSubmit={onSubmit}
                            />
                        </Box>
                    </PerfectScrollbar>
                </Card>
            </Box>
        </>
    );
};

export default TeachersAdd;