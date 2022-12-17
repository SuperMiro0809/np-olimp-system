import { Stack } from '@mui/material';
import AcceptanceCard from "@modules/common/components/AcceptanceCard/AcceptanceCard";
import SchoolIcon from '@mui/icons-material/School';

const RequestListResult = ({ items }) => {
    return (
        <Stack spacing={2}>
            {items.map((el, index) => (
                <AcceptanceCard
                    data={{ title: 'NPMG', subtitle: 'Bigla', icon: SchoolIcon }}
                    key={index}
                />
            ))}
        </Stack>

    );
};

export default RequestListResult;