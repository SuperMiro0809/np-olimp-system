import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Box, Card } from '@mui/material';
import groupService from '@services/group';
import FormBuilder from '@modules/common/components/FormBuilder';
import * as Yup from 'yup';

const ApproveDetails = () => {
    const { key } = useParams();
    const [initialValues, setInitialValues] = useState({});

    useEffect(() => {
        groupService.getGrades(key, '2022-2023')
            .then((res) => {
                const groups = res.data.map((group) =>  ({
                    school_name: group.school_name,
                    subject_name: group.subject_name,
                    class: group.class,
                    approved: group.approved
                }));

                setInitialValues({ groups });
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    const fields = [
        {
            type: 'array', arrayVariant: 'inline', controls: false, name: 'groups', label: 'Групи', labelVariant: 'h5', itemLabel: 'Група', fields: [
                { type: 'text', name: 'school_name', label: 'Училище', readOnly: true },
                { type: 'text', name: 'subject_name', label: 'Предмет', readOnly: true },
                { type: 'text', name: 'class', label: 'Kлас', readOnly: true },
                { type: 'toggle', name: 'approved', label: 'Oдобри', labelOnFalse: 'Откажи' }
            ]
        },
    ];

    const validationSchema = Yup.object().shape({

    });

    const onSubmit = (values, { setSubmitting }) => {

    }

    const submitButton = {
        label: 'Запазване'
    }

    return (
        <>
            <Helmet>
                <title>Детайли | Одобряване на проекти</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    py: 3
                }}
            >
                <Card sx={{ p: 2 }}>
                    <Box>
                        <FormBuilder
                            initialValues={initialValues}
                            fields={fields}
                            validationSchema={validationSchema}
                            onSubmit={onSubmit}
                            submitButton={submitButton}
                            enableReinitialize
                        />
                    </Box>
                </Card>
            </Box>
        </>
    );
}

export default ApproveDetails;