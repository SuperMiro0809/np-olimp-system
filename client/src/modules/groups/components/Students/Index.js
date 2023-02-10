import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import MainTable from "@modules/common/components/MainTable";

const StudentsList = ({ students }) => {
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if(students) {
            setData(students);
            setTotal(students.length);
        }
    }, [students]);

    const get = (page, total, filters = [], order = {}) => {
        // const pagination = {
        //     page: page || 1,
        //     total: total || 10
        // }

        // if (user) {
        //     groupService.getGroups(user.info.school_id, user.info.id, pagination, filters, order)
        //         .then((res) => {
        //             console.log(res.data);
        //             setData(res.data.data);
        //             setTotal(res.data.total);
        //         })
        //         .catch((error) => {
        //             console.log(error)
        //         })
        // }
    }

    const headings = [
        { id: 'id', label: 'ID', order: true },
        { id: 'name', label: 'Име на ученика' },
        { id: 'class', label: 'Клас', order: true },
    ];

    const headFilters = {
        'id': { type: 'search', name: 'id', placeholder: 'Търси по ID' },
        'name': { type: 'search', name: 'name', placeholder: 'Търси по Име на ученика' },
        'class': { type: 'search', name: 'class', placeholder: 'Търси по Клас' }
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
                    checkbox: true,
                    add: true,
                    delete: true,
                    edit: true
                }}
            />
        </Box>
    );
}

export default StudentsList;