import FormBuilder from "../FormBuilder";
import * as Yup from 'yup';

const EducationalOrganizationForm = () => {
    const initialValues = {
        key: '',
        email: '',
        password: '',
        repeatPassword: ''
    };

    const validationSchema = Yup.object().shape({
        key: Yup.string().max(255).required('Кодът по НЕИСПУО е задължителен'),
        email: Yup.string().email('Имейлът не е валиден').max(255).required('Имейлът е задължителен'),
        password: Yup.string().max(255).required('Паролата е задължителна').min(8, 'Паролата трябва да бъде поне 8 символа'),
        repeatPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Паролите не съвпадат'),
    });

    const onSubmit = () => {
        console.log('test');
    };

    const fields = [
        { type: 'text', name: 'key', label: 'Код по НЕИСПУО' },
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

export default EducationalOrganizationForm;