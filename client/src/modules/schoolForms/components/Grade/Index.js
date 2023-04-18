import { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import formService from '@services/form';
import GradeItem from './GradeItem';

const Grade = ({ id, schoolId }) => {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        formService.getById(schoolId, id)
            .then((res) => {
                setGroups(res.data.groups)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

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