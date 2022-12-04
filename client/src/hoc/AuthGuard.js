import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthGuard = ({ component: Component, isLoggedFromRoute, ...rest }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if(isLoggedFromRoute !== false) {
            navigate('/login');
        }

    }, []);

    return <Component />
};

export default AuthGuard;