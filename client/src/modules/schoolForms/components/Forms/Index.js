import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Card } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import formService from '@services/form';
import MainTable from '@modules/common/components/MainTable';
import useMessage from '@modules/common/hooks/useMessage';
import useAuth from '@modules/common/hooks/useAuth';

const FormsList = () => {
    const { id: schoolId } = useParams();
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const { addMessage } = useMessage();

    const get = (page, total, filters = [], order = {}) => {
        const pagination = {
            page: page || 1,
            total: total || 10
        }

        filters.push({ value: 1, label: 'submitted' });

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

    const editPermissionHandler = (event, id) => {
        const data = {
            edit: event.target.checked
        };
        console.log(data);
        formService.changePermissions(schoolId, id, data)
            .then((res) => {
                addMessage('Правата за формуляра са редактирани успешно', 'success');
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const deletePermissionHandler = (event, id) => {
        const data = {
            delete: event.target.checked
        };

        formService.changePermissions(schoolId, id, data)
            .then((res) => {
                addMessage('Правата за формуляра са редактирани успешно', 'success');
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const headings = [
        { id: 'id', label: 'ID', order: true },
        { id: 'schoolYear', label: 'Учебна година', order: true },
        { id: 'subject_name', label: 'Учебен предмет', order: false },
        { id: 'edit', label: 'Права за редактиране', type: 'switch', handler: editPermissionHandler },
        { id: 'delete', label: 'Права за триене', type: 'switch', handler: deletePermissionHandler }
    ];

    const headFilters = {
        'id': { type: 'search', name: 'id', placeholder: 'Търси по ID' },
        'schoolYear': { type: 'search', name: 'schoolYear', placeholder: 'Търси по Учебна година' },
        'subject_name': { type: 'search', name: 'subject_name', placeholder: 'Търси по Учебен предмет' }
    }

    return (
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
                                details: true
                            }}
                        />
                    </Box>
                </PerfectScrollbar>
            </Card>
        </Box>
    );
}

export default FormsList;