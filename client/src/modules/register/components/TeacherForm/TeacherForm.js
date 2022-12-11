import FormBuilder from '../../../common/components/FormBuilder/FormBuilder';
import * as Yup from 'yup';
import userService from '../../../../services/user';

const TeacherForm = ({ setSuccessMsg, setErrorMsg }) => {
    const initialValues = {
        key: '',
        name: '',
        email: '',
        password: '',
        repeatPassword: ''
    };

    const validationSchema = Yup.object().shape({
        key: Yup.string().max(255).required('Кодът по НЕИСПУО е задължителен'),
        name: Yup.string().max(255).required('Трите имена са задължителни'),
        email: Yup.string().email('Имейлът не е валиден').max(255).required('Имейлът е задължителен'),
        password: Yup.string().max(255).required('Паролата е задължителна').min(8, 'Паролата трябва да бъде поне 8 символа'),
        repeatPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Паролите не съвпадат'),
    });

    const onSubmit = (values, { setSubmitting }) => {
        userService.register({ mode: 1, ...values })
        .then((res) => {
            setSuccessMsg('Успешна регистрация! Очаквайте удобрение от администратор.');
            setSubmitting(false);
            const interval = setInterval(function () {
                setSuccessMsg('');
                clearInterval(interval);
            }, 2000)
        })
        .catch((error) => {
            if(error.response.status == 422) {
                setErrorMsg(error.response.data.errors[0]);
            }
            setSubmitting(false);
            
            const interval = setInterval(function () {
                setErrorMsg('');
                clearInterval(interval);
            }, 2000)
        })
    };

    const fields = [
        { type: 'text', name: 'key', label: 'Код по НЕИСПУО на училището' },
        { type: 'text', name: 'name', label: 'Три имена' },
        { type: 'email', name: 'email', label: 'Имейл' },
        { type: 'password', name: 'password', label: 'Парола' },
        { type: 'password', name: 'repeatPassword', label: 'Повторете паролата' },
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

export default TeacherForm;