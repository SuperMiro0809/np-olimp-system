import { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import formService from '@services/form';
import GradeItem from './GradeItem';

const Grade = ({ groups }) => {

    return (
        <Grid container spasing={2} rowGap={2}>
            {groups.map((group, index) => (
                <Grid item xs={12} key={index}>
                    <GradeItem group={group}/>
                </Grid>
            ))}
        </Grid>
    );
}

export default Grade;