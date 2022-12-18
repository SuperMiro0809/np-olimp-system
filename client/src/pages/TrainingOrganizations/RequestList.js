import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@mui/material';
import RequestListResult from '@modules/trainingOrganizations/components/RequestListResult/RequestListResult';
import trainingOrganizationsService from '@services/trainingOrganizations';
import Pagination from '@modules/common/components/Pagination/Pagination';

const RequestList = () => {
    const [requests, setRequests] = useState([]);
    const [page, setPage] = useState(1);
    const [rows, setRows] = useState(10);

    useEffect(() => {
        getNotVerifiedOrganizations();
    }, [page, rows]);

    const getNotVerifiedOrganizations = () => {
        trainingOrganizationsService.getNotVerified(page, rows)
        .then((res) => {
            setRequests(res.data);
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
                <Container maxWidth={false}>
                    <Box sx={{ mt: 3 }}>
                        <RequestListResult
                            items={requests}
                            getNotVerifiedOrganizations={getNotVerifiedOrganizations}
                        />
                    </Box>
                    <Pagination
                        total={100}
                        page={page}
                        setPage={setPage}
                        rows={rows}
                        setRows={setRows}
                    />
                </Container>
            </Box>
        </>
    );
};

export default RequestList;