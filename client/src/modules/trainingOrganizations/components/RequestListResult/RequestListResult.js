import { Stack } from '@mui/material';
import AcceptanceCard from "@modules/common/components/AcceptanceCard/AcceptanceCard";
import SchoolIcon from '@mui/icons-material/School';
import trainingOrganizationsService from '@services/trainingOrganizations';

const RequestListResult = ({ items, getNotVerifiedOrganizations }) => {
    const onAccept = (id) => {
        trainingOrganizationsService.accept(id)
        .then((res) => {
            console.log(res.data);
            getNotVerifiedOrganizations();
        })
        .catch((err) => {
            console.log(err);
        })
    };

    const onReject = (id) => {
        trainingOrganizationsService.reject(id)
        .then((res) => {
            console.log(res.data);
            getNotVerifiedOrganizations();
        })
        .catch((err) => {
            console.log(err);
        })
    };

    return (
        <Stack spacing={2}>
            {items.map((el, index) => (
                <AcceptanceCard
                    data={{ id: el.id, title: el.name, subtitle: el.address, icon: SchoolIcon }}
                    onAccept={onAccept}
                    onReject={onReject}
                    key={index}
                />
            ))}
        </Stack>

    );
};

export default RequestListResult;