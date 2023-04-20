import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Card } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import groupService from '@services/group';
import MainTable from '@modules/common/components/MainTable';
import useMessage from '@modules/common/hooks/useMessage';
import useAuth from '@modules/common/hooks/useAuth';

const GroupsList = () => {
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const { addMessage } = useMessage();
    const { user } = useAuth();

    const get = (page, total, filters = [], order = {}) => {
        const pagination = {
            page: page || 1,
            total: total || 10
        }

        if (!filters.some(el => el.label === 'approved')) {
            filters.push({ value: 1, label: 'approved' });
        }

        if (user) {
            groupService.getGroups(user.info.school_id, user.info.id, pagination, filters, order)
                .then((res) => {
                    console.log(res.data);
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
        { id: 'schoolYear', label: 'Учебна година', order: true },
        { id: 'class', label: 'Клас', order: true },
        { id: 'lessons', label: 'Часове', order: true}
    ];

    const headFilters = {
        'id': { type: 'search', name: 'id', placeholder: 'Търси по ID' },
        'schoolYear': { type: 'search', name: 'schoolYear', placeholder: 'Търси по Учебна година' },
        'class': { type: 'search', name: 'class', placeholder: 'Търси по Клас' },
    }

    return (
        <>
            <Helmet>
                <title>Групи</title>
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
                                options={{
                                    checkbox: false,
                                    add: false,
                                    delete: false,
                                    edit: false,
                                    details: true
                                }}
                            />
                        </Box>
                    </PerfectScrollbar>
                </Card>
            </Box>
        </>
    );
};

export default GroupsList;