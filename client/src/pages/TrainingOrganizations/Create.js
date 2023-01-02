import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { Box, Card } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import trainingOrganizationsService from '@services/trainingOrganizations';
import FormBuilder from '@modules/common/components/FormBuilder';
import * as Yup from 'yup';
import useMessage from '@modules/common/hooks/useMessage';

const TrainingOrganizationsAdd = () => {
    const { addMessage } = useMessage();
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        key: Yup.string().max(255).required('Кодът по НЕИСПУО е задължителен'),
        name: Yup.string().max(255).required('Името на организацията е задължително'),
        address: Yup.string().max(255).required('Адресът е задължителен'),
        email: Yup.string().email('Имейлът не е валиден').max(255).required('Имейлът е задължителен'),
        password: Yup.string().max(255).required('Паролата е задължителна').min(8, 'Паролата трябва да бъде поне 8 символа'),
        repeatPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Паролите не съвпадат'),
    });

    const fields = [
        { type: 'text', name: 'key', label: 'Код по НЕИСПУО' },
        { type: 'text', name: 'name', label: 'Име на организация' },
        { type: 'text', name: 'address', label: 'Адрес' },
        { type: 'email', name: 'email', label: 'Имейл' },
        { type: 'password', name: 'password', label: 'Парола' },
        { type: 'password', name: 'repeatPassword', label: 'Повторете паролата' },
    ];

    const onSubmit = (values, { setSubmitting }) => {
        trainingOrganizationsService.create(values)
            .then((res) => {
                addMessage('Обучителната организация е създадена успешно', 'success');
                navigate('/app/training-organizations');
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
                <title>Създаване | Обучителни организации</title>
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

export default TrainingOrganizationsAdd;
