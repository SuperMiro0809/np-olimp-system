import { Helmet } from 'react-helmet';
import { Box, Container } from '@mui/material';

const TrainingOrganizationsList = () => (
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

export default TrainingOrganizationsList;
