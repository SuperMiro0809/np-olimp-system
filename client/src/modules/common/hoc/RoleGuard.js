import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RoleGuard = ({ component, accessRolesFromRoute, ...rest }) => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const roles = {
        1: 'SuperAdmin',
        2: 'Admin',
        3: 'User'
    }

    useEffect(() => {
        if (user) {
            if (!accessRolesFromRoute.includes(roles[user.role_id])) {
                navigate(-1);
            }
        }

    }, [user]);

    return (
        <>
            {component}
        </>
    );
};

export default RoleGuard;