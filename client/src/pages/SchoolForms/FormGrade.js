import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { Box, Card, Grid } from '@mui/material';
import FormPreview from '@modules/forms/components/Preview';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Grade from '@modules/schoolForms/components/Grade/Index';
import formService from '@services/form';

const FormGrade = () => {
    const { id: schoolId, formId } = useParams();
    const [form, setForm] = useState(null);

    useEffect(() => {
        formService.getById(schoolId, formId)
            .then((res) => {
                setForm(res.data);
            })
            .catch((error) => {
                console.log(error);
            })

    }, [])

    return (
        <>
            <Helmet>
                <title>Оценяване | Училища и формуляри</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    py: 3
                }}
            >
                <Grid container spacing={4}>
                    <Grid item xs={12} xl={6}>
                        <Card sx={{ p: 2 }}>
                            <PerfectScrollbar>
                                <Box>
                                    <FormPreview form={form} id={formId} schoolId={schoolId} />
                                </Box>
                            </PerfectScrollbar>
                        </Card>
                    </Grid>
                    <Grid item xs={12} xl={6}>
                        <Grade groups={form?.groups || []} />
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default FormGrade;