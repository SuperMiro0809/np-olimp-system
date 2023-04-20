import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Card, Typography, Button, Stack } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import useMessage from '@modules/common/hooks/useMessage';
import useAuth from '@modules/common/hooks/useAuth';

import DownloadIcon from '@mui/icons-material/Download';
import DoneIcon from '@mui/icons-material/Done';

const ApproveList = () => {
    return (
        <>
            <Helmet>
                <title>Одобряване на проекти</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    py: 3
                }}
            >
                <Stack spacing={2}>
                    <Card sx={{ p: 2 }}>
                        <PerfectScrollbar>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Typography variant='h3'>РУО София-град</Typography>
                                <Box sx={{ display: 'flex', gap: 5 }}>
                                    <Button
                                        variant='contained'
                                        color='wordBlue'
                                        endIcon={<DownloadIcon />}
                                    >
                                        Изтегли оценачна карта
                                    </Button>
                                    <Button
                                        variant='outlined'
                                        color='lightBlue'
                                        endIcon={<DoneIcon />}
                                    >
                                        Одобряване
                                    </Button>
                                </Box>
                            </Box>
                        </PerfectScrollbar>
                    </Card>
                </Stack>
            </Box>
        </>
    );
}

export default ApproveList;