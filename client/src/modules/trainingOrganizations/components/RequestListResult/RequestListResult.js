import { Stack, Typography } from '@mui/material';
import AcceptanceCard from "@modules/common/components/AcceptanceCard/AcceptanceCard";
import SchoolIcon from '@mui/icons-material/School';
import trainingOrganizationsService from '@services/trainingOrganizations';
import useMessage from '@modules/common/hooks/useMessage';

const RequestListResult = ({ items, getNotVerifiedOrganizations }) => {
    const { addMessage } = useMessage();

    const onAccept = (id) => {
        trainingOrganizationsService.accept(id)
            .then((res) => {
                addMessage('Регистрацията е одобрена', 'success');
                getNotVerifiedOrganizations();
            })
            .catch((err) => {
                console.log(err);
            })
    };

    const onReject = (id) => {
        trainingOrganizationsService.reject(id)
            .then((res) => {
                addMessage('Регистрацията е отказана', 'success');
                getNotVerifiedOrganizations();
            })
            .catch((err) => {
                console.log(err);
            })
    };

    return (
        <>
            {items.length > 0 ?
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
                :
                <Typography component='div' variant='h4' textAlign='center'>Няма заявки</Typography>
            }
        </>
    );
};

export default RequestListResult;