import { useContext } from 'react';
import { Button } from '@mui/material';
import userServices from '../../services/user';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import useAuth from '../../hooks/useAuth';

const LogoutItem = () => {
    const navigate = useNavigate();
    const { setUser } = useAuth();

    const logout = () => {
        userServices.logout()
        .then((res) => {
            setUser(null);
            localStorage.removeItem('refresh-token');
            navigate('/login', { replace: true });
        })
        .catch(err => {
            if(err.message === 'Unauthorized') {
                setUser(null);
                localStorage.removeItem('refresh-token');
                navigate('/login');
            }
        })
    }

    return (
        <Button
            sx={{
                color: '#f44336',
                fontWeight: 'medium',
                justifyContent: 'flex-start',
                letterSpacing: 0,
                py: 1.25,
                textTransform: 'none',
                width: '100%',
                '& svg': {
                    mr: 1
                }
            }}
            onClick={logout}
        >
            <LogoutIcon />
            <span>
                Излизане
            </span>
        </Button>
    );
};

export default LogoutItem;