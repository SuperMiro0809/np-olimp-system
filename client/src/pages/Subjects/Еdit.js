import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Card } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import subjectService from '@services/subject';
import FormBuilder from '@modules/common/components/FormBuilder';
import * as Yup from 'yup';
import useMessage from '@modules/common/hooks/useMessage';

const SubjectsEdit = () => {
    const { addMessage } = useMessage();
    const { id } = useParams();
    const navigate = useNavigate();
    const [initialValues, setInitialValues] = useState({ name: '' });

    useEffect(() => {
        subjectService.getById(id)
            .then((res) => {
                setInitialValues({
                    name: res.data.name
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }, []);

    const validationSchema = Yup.object().shape({
        name: Yup.string().max(255).required('Името на предмета е задължително')
    });

    const fields = [
        { type: 'text', name: 'name', label: 'Име на предмета' }
    ];

    const onSubmit = (values, { setSubmitting }) => {
        subjectService.edit(values, id)
            .then((res) => {
                addMessage('Предметът е редактиран успешно', 'success');
                navigate('/app/subjects');
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
                <title>Редактиране | Предмети</title>
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

export default SubjectsEdit;