import { useParams } from 'react-router-dom';

const ApproveDetails = () => {
    const { key } = useParams();

    return (
        <div>{key}</div>
    );
}

export default ApproveDetails;