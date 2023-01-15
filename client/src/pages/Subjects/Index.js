import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Card } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import subjectService from '@services/subject';
import MainTable from '@modules/common/components/MainTable';
import useMessage from '@modules/common/hooks/useMessage';

const SubjectsList = () => {
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const { addMessage } = useMessage();

    const get = (page, total, filters = [], order = {}) => {
        const pagination = {
            page: page || 1,
            total: total || 10
        }

        subjectService.getSubjects(pagination, filters, order)
            .then((res) => {
                setData(res.data.data);
                setTotal(res.data.total);
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const headings = [
        { id: 'id', label: 'ID', order: true },
        { id: 'name', label: 'Име', order: true }
    ];

    const headFilters = {
        'id': { type: 'search', name: 'id', placeholder: 'Търси по ID' },
        'name': { type: 'search', name: 'name', placeholder: 'Търси по Име' }
    }

    const deleteHandler = (selected) => {
        subjectService.deleteSubjects(selected)
            .then((res) => {
                addMessage('Предметът е изтрита успешно', 'success')
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <>
            <Helmet>
                <title>Предмети</title>
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

export default SubjectsList;