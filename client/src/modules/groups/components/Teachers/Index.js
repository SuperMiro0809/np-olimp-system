import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import MainTable from "@modules/common/components/MainTable";
import useAuth from '@modules/common/hooks/useAuth';
import groupTeachersService from '@services/groupTeachers';

const TeachersList = () => {
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const { id } = useParams();
    const { user } = useAuth();

    const get = (page, total, filters = [], order = {}) => {
        const pagination = {
            page: page || 1,
            total: total || 10
        }

        if (user) {
            groupTeachersService.getTeachers(user.info.school_id, user.info.id, id, pagination, filters, order)
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
        { id: 'name', label: 'Име на учителя' }
    ];

    const headFilters = {
        'id': { type: 'search', name: 'id', placeholder: 'Търси по ID' },
        'name': { type: 'search', name: 'name', placeholder: 'Търси по Име на учителя' }
    }

    const deleteHandler = () => {

    }

    return (
        <Box sx={{ mt: 3 }}>
            <MainTable
                headings={headings}
                headFilters={headFilters}
                rows={data}
                total={total}
                method={get}
                deleteHandler={deleteHandler}
                options={{
                    checkbox: false,
                    add: false,
                    delete: false,
                    edit: false
                }}
                routeName='teachers'
            />
        </Box>
    );
}

export default TeachersList;