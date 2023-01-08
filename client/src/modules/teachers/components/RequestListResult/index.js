import { Stack, Typography } from '@mui/material';
import AcceptanceCard from "@modules/common/components/AcceptanceCard/AcceptanceCard";
import GroupIcon from '@mui/icons-material/Group';
import teacherService from '@services/teacher';
import useMessage from '@modules/common/hooks/useMessage';

const RequestListResult = ({ items, getNotVerifiedTeachers }) => {
    const { addMessage } = useMessage();

    const onAccept = (id) => {
        teacherService.accept(id)
            .then((res) => {
                addMessage('Регистрацията е одобрена', 'success');
                getNotVerifiedTeachers();
            })
            .catch((err) => {
                console.log(err);
            })
    };

    const onReject = (id) => {
        teacherService.reject(id)
            .then((res) => {
                addMessage('Регистрацията е отказана', 'success');
                getNotVerifiedTeachers();
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
                            data={{ id: el.id, title: el.name, subtitle: el.address, icon: GroupIcon }}
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