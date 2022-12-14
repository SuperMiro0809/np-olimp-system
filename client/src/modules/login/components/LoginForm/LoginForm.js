import FormBuilder from '@modules/common/components/FormBuilder';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import userService from '@services/user';
import useAuth from '@modules/common/hooks/useAuth';

const LoginForm = ({ setSuccessMsg, setErrorMsg }) => {
    const navigate = useNavigate();
    const { setUser } = useAuth();

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

    const submitButton = {
        label: 'Влизане',
        color: 'lightBlue'
    };

    return (
        <FormBuilder
            fields={fields}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            submitButton={submitButton}
        />
    );
}

export default LoginForm;