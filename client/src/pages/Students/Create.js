import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Card } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import groupStudentsService from '@services/groupStudents';
import FormBuilder from '@modules/common/components/FormBuilder';
import * as Yup from 'yup';
import useMessage from '@modules/common/hooks/useMessage';
import useAuth from '@modules/common/hooks/useAuth';

const StudentAdd = () => {
    const { addMessage } = useMessage();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { id } = useParams();

    const validationSchema = Yup.object().shape({
        name: Yup.string().max(255).required('Името на ученика е задължително'),
        class: Yup.string().required('Класът на ученика е задължителен')
    });

    const fields = [
        { type: 'text', name: 'name', label: 'Име на ученика' },
        {
            type: 'select', name: 'class', label: 'Клас', options: [
                { label: '5', value: '5' },
                { label: '6', value: '6' },
                { label: '7', value: '7' },
                { label: '8', value: '8' },
                { label: '9', value: '9' },
                { label: '10', value: '10' },
                { label: '11', value: '11' },
                { label: '12', value: '12' },
            ]
        }
    ];

    const onSubmit = (values, { setSubmitting }) => {
        if (user) {
            groupStudentsService.create(values, user.info.school_id, user.info.id, id)
                .then((res) => {
                    addMessage('Ученикът е създаден успешно', 'success');
                    navigate(`/app/groups/${id}`);
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
                <title>Създаване | Ученик</title>
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

export default StudentAdd;