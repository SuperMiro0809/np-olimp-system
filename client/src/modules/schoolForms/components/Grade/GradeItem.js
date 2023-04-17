import { Box, Card } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import FormBuilder from '@modules/common/components/FormBuilder';
import * as Yup from 'yup';

const GradeItem = () => {
    const validationSchema = Yup.object().shape({
        name: Yup.string().max(255).required('Името на ученика е задължително'),
        class: Yup.string().required('Класът на ученика е задължителен')
    });

    const fields = [
        { type: 'number', name: 'name', label: 'Допустимост', endAdornment: { text: '/1' } },
        { type: 'number', name: 'name', label: 'Формуляр за кандидатстване', endAdornment: { text: '/1' } },
        { type: 'number', name: 'name', label: 'Училищен екип', endAdornment: { text: '/1' } },
        { type: 'number', name: 'name', label: 'Описание на проекта', endAdornment: { text: '/6' } },
        { type: 'number', name: 'name', label: 'Бюджет', endAdornment: { text: '/2' } },
        { type: 'number', name: 'name', label: 'Списък на учениците', endAdornment: { text: '/3' } },
        { type: 'number', name: 'name', label: 'Декларации на родителите', endAdornment: { text: '/1' } },
        { type: 'number', name: 'name', label: 'Мотивационни писма', endAdornment: { text: '/1' } },
        { type: 'number', name: 'name', label: 'План за обучението', endAdornment: { text: '/1' } },
        { type: 'number', name: 'name', label: 'График', endAdornment: { text: '/1' } },
    ];

    const onSubmit = (values, { setSubmitting }) => {
       
    }

    return (
        <>
            <Card sx={{ p: 2 }}>
                <PerfectScrollbar>
                    <Box>
                        <FormBuilder
                            fields={fields}
                            validationSchema={validationSchema}
                            onSubmit={onSubmit}
                        />
                    </Box>
                </PerfectScrollbar>
            </Card>
        </>
    );
}

export default GradeItem;