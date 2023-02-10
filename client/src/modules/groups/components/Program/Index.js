import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import MainTable from "@modules/common/components/MainTable";
import useAuth from '@modules/common/hooks/useAuth';
import groupProgramService from '@services/groupProgram';

const ProgramList = () => {
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
            groupProgramService.getProgram(user.info.school_id, user.info.id, id, pagination, filters, order)
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
        { id: 'theme', label: 'Tема' },
        { id: 'lessons', label: 'Учебни часове', order: true },
    ];

    const headFilters = {
        'id': { type: 'search', name: 'id', placeholder: 'Търси по ID' },
        'theme': { type: 'search', name: 'theme', placeholder: 'Търси по Tема' },
        'lessons': { type: 'search', name: 'lessons', placeholder: 'Търси по Учебни часове' }
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
                routeName='program'
            />
        </Box>
    );
}

export default ProgramList;