import FormBuilder from '@modules/common/components/FormBuilder';
import * as Yup from 'yup';
import userService from '@services/user';

const EducationalOrganizationForm = ({ setSuccessMsg, setErrorMsg }) => {
    const validationSchema = Yup.object().shape({
        key: Yup.string().max(255).required('Кодът по НЕИСПУО е задължителен'),
        name: Yup.string().max(255).required('Името на организацията е задължително'),
        address: Yup.string().max(255).required('Адресът е задължителен'),
        email: Yup.string().email('Имейлът не е валиден').max(255).required('Имейлът е задължителен'),
        password: Yup.string().max(255).required('Паролата е задължителна').min(8, 'Паролата трябва да бъде поне 8 символа'),
        repeatPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Паролите не съвпадат'),
    });

    const onSubmit = (values, { setSubmitting }) => {
        userService.register({ mode: 0, ...values})
        .then((res) => {
            setSuccessMsg('Успешна регистрация! Очаквайте одобрение от администратор.');
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
            console.log(error);
        })
    };

    const fields = [
        { type: 'text', name: 'key', label: 'Код по НЕИСПУО' },
        { type: 'text', name: 'name', label: 'Име на организация' },
        { type: 'text', name: 'address', label: 'Адрес' },
        { type: 'email', name: 'email', label: 'Имейл' },
        { type: 'password', name: 'password', label: 'Парола' },
        { type: 'password', name: 'repeatPassword', label: 'Повторете паролата' },
    ];

    const submitButton = {
        label: 'Регистриране',
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

export default EducationalOrganizationForm;