import { useContext } from 'react';
import { Button } from '@mui/material';
import userServices from '../../services/user';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

const LogoutItem = () => {
    let navigate = useNavigate();

    const logout = () => {
        userServices.logout()
        .then((res) => {
            //userContext[1]({});
            localStorage.removeItem('refresh-token');
            navigate('/login', { replace: true });
        })
        .catch(err => {
            if(err.message === 'Unauthorized') {
                // userContext[1]({});
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