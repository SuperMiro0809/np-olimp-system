import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { Box, Card } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import subjectService from '@services/subject';
import FormBuilder from '@modules/common/components/FormBuilder';
import * as Yup from 'yup';
import useMessage from '@modules/common/hooks/useMessage';

const SubjectsAdd = () => {
    const { addMessage } = useMessage();
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        name: Yup.string().max(255).required('Името на предмета е задължително')
    });

    const fields = [
        { type: 'text', name: 'name', label: 'Име на предмета' }
    ];

    const onSubmit = (values, { setSubmitting }) => {
        subjectService.create(values)
            .then((res) => {
                addMessage('Предметът е създаден успешно', 'success');
                navigate('/app/subjects');
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
                <title>Създаване | Предмети</title>
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

export default SubjectsAdd;