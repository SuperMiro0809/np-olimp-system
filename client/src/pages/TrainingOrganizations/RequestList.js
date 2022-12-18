import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@mui/material';
import RequestListResult from '@modules/trainingOrganizations/components/RequestListResult/RequestListResult';
import trainingOrganizationsService from '@services/trainingOrganizations';

const RequestList = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        getNotVerifiedOrganizations();
    }, []);

    const getNotVerifiedOrganizations = () => {
        trainingOrganizationsService.getNotVerified()
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
                        <RequestListResult items={requests} getNotVerifiedOrganizations={getNotVerifiedOrganizations} />
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default RequestList;