import { Helmet } from 'react-helmet';
import { Box, Container } from '@mui/material';
import RequestListResult from '@modules/trainingOrganizations/components/RequestListResult/RequestListResult';

const RequestList = () => {
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
                        <RequestListResult items={[1, 2, 3, 4]}/>
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default RequestList;