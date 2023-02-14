import { Grid, TextField } from '@mui/material';

const PasswordsForm = (props) => {
    const {
        errors,
        handleBlur,
        handleChange,
        touched,
        values
    } = props;

    return (
        <Grid
            container
            spacing={3}
        >
            <Grid
                item
                xs={12}
            >
                <TextField
                    error={Boolean(touched.oldPassword && errors.oldPassword)}
                    fullWidth
                    helperText={touched.oldPassword && errors.oldPassword}
                    label='Стара парола'
                    name='oldPassword'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type='password'
                    value={values.oldPassword}
                    variant='outlined'
                />
            </Grid>
            <Grid
                item
                xs={12}
            >
                <TextField
                    error={Boolean(touched.password && errors.password)}
                    fullWidth
                    helperText={touched.password && errors.password}
                    label='Нова парола'
                    name='password'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type='password'
                    value={values.password}
                    variant='outlined'
                />
            </Grid>
            <Grid
                item
                xs={12}
            >
                <TextField
                    error={Boolean(touched.repeatPassword && errors.repeatPassword)}
                    fullWidth
                    helperText={touched.repeatPassword && errors.repeatPassword}
                    label='Повтори новата парола'
                    name='repeatPassword'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type='password'
                    value={values.repeatPassword}
                    variant='outlined'
                />
            </Grid>
        </Grid>
    );
}

export default PasswordsForm;