import { Stack } from '@mui/material';
import AcceptanceCard from "@modules/common/components/AcceptanceCard/AcceptanceCard";
import SchoolIcon from '@mui/icons-material/School';
import trainingOrganizationsService from '@services/trainingOrganizations';

const RequestListResult = ({ items }) => {
    const onAccept = () => {
        console.log('accept');
    };

    const onReject = () => {
        console.log('reject');
    };

    return (
        <Stack spacing={2}>
            {items.map((el, index) => (
                <AcceptanceCard
                    data={{ title: el.name, subtitle: el.address, icon: SchoolIcon }}
                    onAccept={onAccept}
                    onReject={onReject}
                    key={index}
                />
            ))}
        </Stack>

    );
};

export default RequestListResult;