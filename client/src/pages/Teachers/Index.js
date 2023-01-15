import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Card } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import teacherService from '@services/teacher';
import MainTable from '@modules/common/components/MainTable';
import useMessage from '@modules/common/hooks/useMessage';
import useAuth from '@modules/common/hooks/useAuth';

const TeachersList = () => {
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const { addMessage } = useMessage();
    const { user } = useAuth();

    const get = (page, total, filters = [], order = {}) => {
        const pagination = {
            page: page || 1,
            total: total || 10
        }

        if (user) {
            teacherService.getVerified(user.info.id, pagination, filters, order)
                .then((res) => {
                    setData(res.data.data);
                    setTotal(res.data.total);
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }

    const headings = [
        { id: 'id', label: 'ID', order: true },
        { id: 'name', label: 'Име', order: true },
        { id: 'email', label: 'Имейл', order: true },
    ];

    const headFilters = {
        'id': { type: 'search', name: 'id', placeholder: 'Търси по ID' },
        'name': { type: 'search', name: 'name', placeholder: 'Търси по Име' },
        'email': { type: 'search', name: 'email', placeholder: 'Търси по Имейл' }
    }

    const deleteHandler = (selected) => {
        if (user) {
            teacherService.deleteTeachers(user.info.id, selected)
                .then((res) => {
                    addMessage('Учителят е изтрит успешно', 'success')
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    return (
        <>
            <Helmet>
                <title>Учители</title>
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
                            <MainTable
                                headings={headings}
                                headFilters={headFilters}
                                rows={data}
                                total={total}
                                method={get}
                                deleteHandler={deleteHandler}
                                options={{
                                    checkbox: true,
                                    add: true,
                                    delete: true,
                                    edit: true
                                }}
                            />
                        </Box>
                    </PerfectScrollbar>
                </Card>
            </Box>
        </>
    );
};

export default TeachersList;
