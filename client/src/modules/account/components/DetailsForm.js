import { Grid, TextField } from '@mui/material';

const DetailsForm = (props) => {
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
                    error={Boolean(touched.name && errors.name)}
                    fullWidth
                    helperText={touched.name && errors.name}
                    label='Име'
                    name='name'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    variant='outlined'
                />
            </Grid>
            <Grid
                item
                xs={12}
            >
                <TextField
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={touched.email && errors.email}
                    label='Имейл'
                    name='email'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    variant='outlined'
                />
            </Grid>
        </Grid>
    );
}

export default DetailsForm;