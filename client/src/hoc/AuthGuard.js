import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const AuthGuard = ({ component: Component, isLoggedFromRoute, ...rest }) => {
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        if(isLoggedFromRoute !== !!user) {
            navigate('/login');
        }

    }, []);

    return <Component />
};

export default AuthGuard;