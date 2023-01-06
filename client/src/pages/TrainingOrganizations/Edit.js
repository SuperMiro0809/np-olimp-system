import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Card } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import trainingOrganizationsService from '@services/trainingOrganizations';
import FormBuilder from '@modules/common/components/FormBuilder';
import * as Yup from 'yup';
import useMessage from '@modules/common/hooks/useMessage';

const TrainingOrganizationsEdit = () => {
    const { addMessage } = useMessage();
    const { id } = useParams();
    const navigate = useNavigate();
    const [initialValues, setInitialValues] = useState({ key: '', name: '', address: '', email: '' });

    useEffect(() => {
        trainingOrganizationsService.getById(id)
            .then((res) => {
                setInitialValues({
                    key: res.data.key,
                    name: res.data.name,
                    address: res.data.address,
                    email: res.data.email
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }, []);

    const validationSchema = Yup.object().shape({
        key: Yup.string().max(255).required('Кодът по НЕИСПУО е задължителен'),
        name: Yup.string().max(255).required('Името на организацията е задължително'),
        address: Yup.string().max(255).required('Адресът е задължителен'),
        email: Yup.string().email('Имейлът не е валиден').max(255).required('Имейлът е задължителен'),
    });

    const fields = [
        { type: 'text', name: 'key', label: 'Код по НЕИСПУО' },
        { type: 'text', name: 'name', label: 'Име на организация' },
        { type: 'text', name: 'address', label: 'Адрес' },
        { type: 'email', name: 'email', label: 'Имейл' }
    ];

    const onSubmit = (values, { setSubmitting }) => {
        trainingOrganizationsService.edit(values, id)
            .then((res) => {
                addMessage('Обучителната организация е редактирана успешно', 'success');
                navigate('/app/training-organizations');
            })
            .catch((error) => {
                if(error.response.status == 422) {
                    addMessage(error.response.data.errors[0], 'error');
                }
                setSubmitting(false);
            })
    }

    const submitButton = {
        label: 'Редактиране'
    }

    return (
        <>
            <Helmet>
                <title>Редактиране | Обучителни организации</title>
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
};

export default TrainingOrganizationsEdit;