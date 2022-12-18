import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@mui/material';
import trainingOrganizationsService from '../../services/trainingOrganizations';

const TrainingOrganizationsList = () => {

    useEffect(() => {
        trainingOrganizationsService.getVerified()
        .then((res) => {
            console.log(res);
        })
    }, []);

    return (
        <>
            <Helmet>
                <title>Обучителни организации</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    py: 3
                }}
            >
                <Container maxWidth={false}>

                </Container>
            </Box>
        </>
    );
};

export default TrainingOrganizationsList;
