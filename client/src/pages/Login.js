import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
    Box,
    Container,
    Link,
    Typography,
    Alert
} from '@mui/material';
import LoginForm from '@modules/login/components/LoginForm/LoginForm';

const Login = () => {
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    return (
        <>
            <Helmet>
                <title>Login | Material Kit</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    justifyContent: 'center'
                }}
            >
                <Container maxWidth="sm">
                    <Box sx={{ mb: 2 }}>
                        <Typography
                            color="textPrimary"
                            variant="h2"
                        >
                            Вход
                        </Typography>
                        <Typography
                            color="textSecondary"
                            gutterBottom
                            variant="body2"
                        >
                            Въведете имейл и парола, за да влезете в системата
                        </Typography>
                    </Box>

                    {successMsg &&
                        <Box sx={{ my: 1 }}>
                        <Alert severity="success">{successMsg}</Alert>
                        </Box>
                    }
                    {errorMsg &&
                        <Box sx={{ my: 1 }}>
                        <Alert severity="error">{errorMsg}</Alert>
                        </Box>
                    }

                    <Box>
                        <LoginForm setSuccessMsg={setSuccessMsg} setErrorMsg={setErrorMsg} />
                    </Box>

                    <Typography
                        color="textSecondary"
                        variant="body1"
                    >
                        Нямате акаунт?
                        {' '}
                        <Link component={RouterLink} to="/register" variant="h5" underline="hover">
                            Регистрация
                        </Link>
                    </Typography>
                </Container>
            </Box>
        </>
    );
};

export default Login;
