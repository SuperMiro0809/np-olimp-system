import { Box, Card, Grid } from '@mui/material';
import GradeItem from './GradeItem';

const Grade = () => {
    return (
        <Grid container spasing={2} rowGap={2}>
            <Grid item xs={12}>
                <GradeItem />
            </Grid>
            <Grid item xs={12}>
                <GradeItem />
            </Grid>
            <Grid item xs={12}>
                <GradeItem />
            </Grid>
        </Grid>
    );
}

export default Grade;