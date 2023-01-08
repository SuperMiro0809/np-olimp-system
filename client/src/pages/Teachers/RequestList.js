import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Box } from '@mui/material';
import RequestListResult from '@modules/teachers/components/RequestListResult';
import teacherService from '@services/teacher';
import Pagination from '@modules/common/components/Pagination/Pagination';
import Select from '@modules/common/components/filters/Select';

const RequestList = () => {
    const [requests, setRequests] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [rows, setRows] = useState(10);
    const [sort, setSort] = useState('desc');

    const options = [
        { label: 'Първо по-новите', value: 'desc' },
        { label: 'Първо по-старите', value: 'asc' }
    ]

    useEffect(() => {
        getNotVerifiedTeachers();
    }, [page, rows, sort]);

    const getNotVerifiedTeachers = () => {
        const order = {
            field: 'created_at',
            direction: sort
        }

        teacherService.getNotVerified(page, rows, order)
            .then((res) => {
                setRequests(res.data.data);
                setTotal(res.data.total);
            })
            .catch((err) => {
                console.log(err);
            })
    };

    return (
        <>
            <Helmet>
                <title>Заявки | Учители</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    pt: 3,
                    pb: 6
                }}
            >
                <Box sx={{ mb: 2 }}>
                    <Select
                        title='Сортиране'
                        options={options}
                        value={sort}
                        setValue={setSort}
                    />
                </Box>
                <Box>
                    <RequestListResult
                        items={requests}
                        getNotVerifiedTeachers={getNotVerifiedTeachers}
                    />
                </Box>
                <Pagination
                    total={total}
                    page={page}
                    setPage={setPage}
                    rows={rows}
                    setRows={setRows}
                />
            </Box>
        </>
    );
};

export default RequestList;