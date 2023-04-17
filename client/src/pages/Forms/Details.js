import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { Box, Card } from '@mui/material';
import FormPreview from '@modules/forms/components/Preview';
import useAuth from '@modules/common/hooks/useAuth';

const FormsDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    let schoolId = 0;

    if(user) {
        schoolId = user.role.name === 'Moderator' ? user.info.id : user.info.school_id;
    }

    return (
        <>
            <Helmet>
                <title>Преглеждане | Формуляри</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    py: 3
                }}
            >
                <Card sx={{ p: 2 }}>
                    <Box>
                        <FormPreview id={id} schoolId={schoolId} />
                    </Box>
                </Card>
            </Box>
        </>
    );
}

export default FormsDetails;