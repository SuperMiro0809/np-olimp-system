import FormBuilder from "../FormBuilder";
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import userService from '../../services/user';
import useAuth from '../../hooks/useAuth';

const LoginForm = ({ setSuccessMsg, setErrorMsg }) => {
    const navigate = useNavigate();
    const { setUser } = useAuth();
    const initialValues = {
        email: '',
        password: ''
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Имейлът не е валиден').max(255).required('Имейлът е задължителен'),
        password: Yup.string().max(255).required('Паролата е задължителна')
    });

    const onSubmit = (values, { setSubmitting }) => {
        userService.login(values)
        .then((res) => {
            localStorage.setItem('refresh-token', res.data.token);
            setUser(res.data.user);
            navigate('/app/dashboard', { replace: true });
        })
        .catch((error) => {
            const msg = error.response.data.error;
            setErrorMsg(msg);
            setSubmitting(false);

            const interval = setInterval(function () {
                setErrorMsg('');
                clearInterval(interval);
            }, 2000)
        })
    };

    const fields = [
        { type: 'email', name: 'email', label: 'Имейл' },
        { type: 'password', name: 'password', label: 'Парола' }
    ];

    return (
        <FormBuilder
            fields={fields}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        />
    );
}

export default LoginForm;