import FormBuilder from "../FormBuilder";
import * as Yup from 'yup';
import userService from '../../services/user';

const LoginForm = ({ setSuccessMsg, setErrorMsg }) => {
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
            console.log(res);
        })
        .catch((error) => {
            setSubmitting(false);
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