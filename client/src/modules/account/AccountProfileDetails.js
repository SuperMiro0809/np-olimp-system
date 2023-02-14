import { useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider
} from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import useAuth from '@modules/common/hooks/useAuth';
import useMessage from '@modules/common/hooks/useMessage';
import DetailsForm from './components/DetailsForm';
import PasswordsForm from './components/PasswordsForm';

import userService from '@services/user';

const AccountProfileDetails = (props) => {
    const { user, setUser } = useAuth();
    const { addMessage } = useMessage();
    const [mode, setMode] = useState('details');

    const [initialValues, setInitialValues] = useState({
        name: user ? user.info.name : '',
        email: user ? user.email : '',
        oldPassword: '',
        password: '',
        repeatPassword: ''
    });

    const changeMode = () => {
        if (mode === 'details') {
            setMode('password');
        } else {
            setMode('details');
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={Yup.object().shape(
                mode === 'details' ?
                    {
                        name: Yup.string().max(255).required('Името е задължително'),
                        email: Yup.string().email('Имейлът не е валиден').max(255).required('Имейлът е задължителен')
                    } :
                    {
                        oldPassword: Yup.string().max(255).required('Старата паролата е задължителна'),
                        password: Yup.string().max(255).required('Новата паролата е задължителна').min(8, 'Паролата трябва да бъде поне 8 символа').when('oldPassword', (oldPassword, schema) => {
                            if (oldPassword) {
                                return schema.test({
                                    test: newPassword => newPassword !== oldPassword,
                                    message: 'Новата парола трябва да е различна от старата'
                                })
                            }
                        }),
                        repeatPassword: Yup.string().max(255).required('Повтоерете новата паролата е задължително').when('password', (password, schema) => {
                            if (password) {
                                return schema.test({
                                    test: repeatPassword => repeatPassword === password,
                                    message: 'Паролите не съвпадат'
                                })
                            }
                        })
                    }
            )}
            onSubmit={(values, { setSubmitting }) => {
                if (mode === 'details') {
                    userService.edit(values, user.id)
                        .then((res) => {
                            addMessage('Акаунтът е редактиран успешно', 'success');
                            setUser(res.data);
                        })
                        .catch((error) => {
                            if (error.response.status == 422) {
                                addMessage(error.response.data.errors[0], 'error');
                            }
                            setSubmitting(false);
                        })
                }else {
                    userService.changePassword(values, user.id)
                        .then((res) => {
                            addMessage('Паролата е сменена успешно', 'success');
                        })
                        .catch((error) => {
                            if (error.response.status == 422) {
                                addMessage(error.response.data.errors[0], 'error');
                            }
                            setSubmitting(false);
                        })
                }
            }}
            enableReinitialize
        >
            {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values
            }) => {
                const formikProps = {
                    errors,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    isSubmitting,
                    touched,
                    values
                };

                return (
                    <form onSubmit={handleSubmit}>
                        <Card>
                            <CardHeader
                                subheader='Информацията може да бъде редактирана'
                                title='Профил'
                            />
                            <Divider />
                            <CardContent>
                                {mode === 'details' ? (
                                    <DetailsForm {...formikProps} />
                                ) : (
                                    <PasswordsForm {...formikProps} />
                                )}
                            </CardContent>
                            <Divider />
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    gap: 2,
                                    p: 2
                                }}
                            >
                                <Button
                                    color='lightBlue'
                                    variant='outlined'
                                    size='large'
                                    onClick={changeMode}
                                >
                                    {mode === 'details' ? 'Смяна на парола' : 'Редактиране на профил'}
                                </Button>
                                <Button
                                    color='primary'
                                    variant='contained'
                                    type='submit'
                                >
                                    Запази
                                </Button>
                            </Box>
                        </Card>
                    </form>
                )
            }}
        </Formik>
    );
};

export default AccountProfileDetails;
