import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Card } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import formService from '@services/form';
import MainTable from '@modules/common/components/MainTable';
import useMessage from '@modules/common/hooks/useMessage';
import useAuth from '@modules/common/hooks/useAuth';

const FormsList = () => {
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
            const schoolId = user.role.name === 'Moderator' ? user.info.id : user.info.school_id;

            if(user.role.name === 'User') {
                filters.push({ value: user.info.id, label: 'teacher' });
            }

            formService.getForms(schoolId, pagination, filters, order)
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
        { id: 'subject_name', label: 'Учебен предмет', order: false }
    ];

    const headFilters = {
        'id': { type: 'search', name: 'id', placeholder: 'Търси по ID' },
        'schoolYear': { type: 'search', name: 'schoolYear', placeholder: 'Търси по Учебна година' },
        'subject_name': { type: 'search', name: 'subject_name', placeholder: 'Търси по Учебен предмет' }
    }

    const deleteHandler = (selected) => {
        if (user) {

        }
    }

    return (
        <>
            <Helmet>
                <title>Формуляри</title>
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
                                    add: Boolean(user && user.info.form_permission),
                                    delete: Boolean(user && user.info.form_permission),
                                    edit: Boolean(user && user.info.form_permission)
                                }}
                            />
                        </Box>
                    </PerfectScrollbar>
                </Card>
            </Box>
        </>
    );
};

export default FormsList;