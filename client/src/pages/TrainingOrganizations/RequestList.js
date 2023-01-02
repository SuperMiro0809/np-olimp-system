import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@mui/material';
import RequestListResult from '@modules/trainingOrganizations/components/RequestListResult/RequestListResult';
import trainingOrganizationsService from '@services/trainingOrganizations';
import Pagination from '@modules/common/components/Pagination/Pagination';

const RequestList = () => {
    const [requests, setRequests] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [rows, setRows] = useState(10);

    useEffect(() => {
        getNotVerifiedOrganizations();
    }, [page, rows]);

    const getNotVerifiedOrganizations = () => {
        trainingOrganizationsService.getNotVerified(page, rows)
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
                <title>Заявки | Обучителни организации</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    py: 3
                }}
            >
                <Box>
                    <RequestListResult
                        items={requests}
                        getNotVerifiedOrganizations={getNotVerifiedOrganizations}
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