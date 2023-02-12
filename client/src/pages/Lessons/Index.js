import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Card, Button } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Scheduler from '@modules/common/components/Scheduler/dist/index.esm';

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
    })

    const events = [
        {
            id: "event-1",
            label: "Medical consultation",
            groupLabel: "Dr Shaun Murphy",
            user: "Dr Shaun Murphy",
            color: "#f28f6a",
            startHour: "04:00 AM",
            endHour: "05:00 AM",
            date: "2023-02-05",
            createdAt: new Date(),
            createdBy: "Kristina Mayer"
        },
        {
            id: "event-2",
            label: "Medical consultation",
            groupLabel: "Dr Claire Brown",
            user: "Dr Claire Brown",
            color: "#099ce5",
            startHour: "09:00 AM",
            endHour: "10:00 AM",
            date: "2023-02-09",
            createdAt: new Date(),
            createdBy: "Kristina Mayer"
        },
        {
            id: "event-3",
            label: "Medical consultation",
            groupLabel: "Dr Menlendez Hary",
            user: "Dr Menlendez Hary",
            color: "#263686",
            startHour: "13:00 PM",
            endHour: "14:00 PM",
            date: "2023-02-10",
            createdAt: new Date(),
            createdBy: "Kristina Mayer"
        },
        {
            id: "event-4",
            label: "Consultation prénatale",
            groupLabel: "Dr Shaun Murphy",
            user: "Dr Shaun Murphy",
            color: "#f28f6a",
            startHour: "08:00 AM",
            endHour: "09:00 AM",
            date: "2023-02-11",
            createdAt: new Date(),
            createdBy: "Kristina Mayer"
        }
    ]

    const handleCellClick = (event, row, day) => {
        // Do something...
    }

    const handleEventClick = (event, item) => {
        // Do something...
    }

    const handleEventsChange = (item) => {
        // Do something...
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
                            />
                        </Box>
                    </PerfectScrollbar>
                </Card>
            </Box>
        </>
    );
}

export default LessonsScheduler;