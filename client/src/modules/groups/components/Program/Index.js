import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import MainTable from "@modules/common/components/MainTable";

const ProgramList = ({ program }) => {
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if(program) {
            setData(program);
            setTotal(program.length);
        }
    }, [program]);

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
                    checkbox: true,
                    add: true,
                    delete: true,
                    edit: true
                }}
            />
        </Box>
    );
}

export default ProgramList;