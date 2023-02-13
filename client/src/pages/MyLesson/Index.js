import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Box, Card, Typography } from '@mui/material';
import DatePicker from '@modules/common/components/FormBuilder/Fields/DateField/DatePicker';
import moment from 'moment';

import groupLessonsService from '@services/groupLessons';
import useAuth from '@modules/common/hooks/useAuth';

import LessonsList from './LessonsList';

const MyLesson = () => {
    const [date, setDate] = useState(moment(new Date()).format('YYYY/MM/DD'));
    const [lessons, setLessons] = useState([]);
    const { user } = useAuth();

    const dateField = { name: 'date' };
    const dateFieldBaseProps = {
        value: date,
        name: dateField.name,
        label: 'Дата',
        fullWidth: true,
        margin: 'normal',
        variant: 'outlined',
    };

    const handleDate = (name, value) => {
        setDate(value)
    }

    useEffect(() => {
        if(user) {
            const filters = [
                { label: 'date', value: date }
            ];

            groupLessonsService.getLessons(user.info.school_id, user.info.id, filters)
            .then((res) => {
                setLessons(res.data);
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }, [date])


    return (
        <>
            <Helmet>
                <title>Моят час</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    py: 3
                }}
            >
                <Card sx={{ p: 2 }}>
                    <PerfectScrollbar>
                        <Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mb: 3 }}>
                                <DatePicker
                                    field={dateField}
                                    baseProps={dateFieldBaseProps}
                                    setFieldValue={handleDate}
                                    setFieldTouched={() => { }}
                                />
                            </Box>

                            {lessons.length > 0 ? (
                                <LessonsList lessons={lessons} />
                            ) : (
                                <Typography component='div' variant='h4' textAlign='center'>Няма часове за тази дата</Typography>
                            )}

                        </Box>
                    </PerfectScrollbar>
                </Card>
            </Box>
        </>
    );
}

export default MyLesson;