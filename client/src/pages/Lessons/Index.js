import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Card, Button } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Scheduler from '@modules/common/components/Scheduler/dist/index.esm';
import groupLessonsService from '@services/groupLessons';
import useAuth from '@modules/common/hooks/useAuth';
import useMessage from '@modules/common/hooks/useMessage';

import AddIcon from '@mui/icons-material/Add';

const LessonsScheduler = () => {
    const [state] = useState({
        options: {
            transitionMode: "zoom", // or fade
            startWeekOn: "mon",     // or sun
            defaultMode: "month",    // or week | day | timeline
            minWidth: 540,
            maxWidth: 540,
            minHeight: 540,
            maxHeight: 540
        },
        // alertProps: {
        //     open: true,
        //     color: "info",          // info | success | warning | error
        //     severity: "info",       // info | success | warning | error
        //     message: "🚀 Let's start with awesome react-mui-scheduler 🔥 🔥 🔥",
        //     showActionButton: true,
        //     showNotification: true,
        //     delay: 1500
        // },
        toolbarProps: {
            showSearchBar: false,
            showSwitchModeButtons: true,
            showDatePicker: true
        }
    });
    const [events, setEvents] = useState([]);
    const { user } = useAuth();
    const { addMessage } = useMessage();

    const hourFormat = (time) => {
        const [hour, min, sec] = time.split(':');
        let period = '';

        if (Number(hour) > 11) {
            period = 'pm';
        } else {
            period = 'am';
        }

        return `${hour}:${min} ${period}`;
    }

    const timeFormat = (hour) => {
        const [hourPart, period] = hour.split(' ');
        const [h, min] = hourPart.split(':');

        return `${h}:${min}:00`;
    }

    const get = () => {
        if (user) {
            groupLessonsService.getLessons(user.info.school_id, user.info.id)
                .then((res) => {
                    const events = res.data.map((event) => {

                        return {
                            id: event.id,
                            label: event.label,
                            groupLabel: event.class,
                            //user: "Dr Shaun Murphy",
                            color: "#f28f6a",
                            startHour: hourFormat(event.startHour),
                            endHour: hourFormat(event.endHour),
                            date: event.date,
                            createdAt: event.created_at,
                            //createdBy: "Kristina Mayer"
                        }
                    })

                    setEvents(events)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }

    useEffect(() => {
        get();
    }, [])

    const handleCellClick = (event, row, day) => {
        // Do something...
    }

    const handleEventClick = (event, item) => {
        // Do something...
    }

    const handleEventsChange = (item) => {
        const data = {
            ...item,
            startHour: timeFormat(item.startHour),
            endHour: timeFormat(item.endHour)
        }

        groupLessonsService.edit(data, user.info.school_id, user.info.id, item.id)
            .then((res) => {
                addMessage('Занятието е редактирано успешно', 'success');
                get();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleAlertCloseButtonClicked = (item) => {
        // Do something...
    }

    return (
        <>
            <Helmet>
                <title>Занятия</title>
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
                                <Button
                                    component={RouterLink}
                                    variant='contained'
                                    color='lightBlue'
                                    textcolor='lightBlue'
                                    startIcon={<AddIcon />}
                                    to='create'
                                >
                                    Добави
                                </Button>
                            </Box>

                            <Scheduler
                                locale="bg"
                                events={events}
                                legacyStyle={false}
                                options={state?.options}
                                alertProps={state?.alertProps}
                                toolbarProps={state?.toolbarProps}
                                onEventsChange={handleEventsChange}
                                onCellClick={handleCellClick}
                                onTaskClick={handleEventClick}
                                onAlertCloseButtonClicked={handleAlertCloseButtonClicked}
                                key={events}
                            />
                        </Box>
                    </PerfectScrollbar>
                </Card>
            </Box>
        </>
    );
}

export default LessonsScheduler;