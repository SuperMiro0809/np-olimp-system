import { Box, Card, Typography } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import FormBuilder from '@modules/common/components/FormBuilder';
import groupService from '@services/group';
import * as Yup from 'yup';
import useMessage from '@modules/common/hooks/useMessage';

const GradeItem = ({ group }) => {
    const { addMessage } = useMessage();
    const { grade } = group;
    
    const initialValues = {
        acceptability: grade.acceptability,
        form: grade.form,
        teachers: grade.teachers,
        description: grade.description,
        budget: grade.budget,
        students: grade.students,
        declarations: grade.declarations,
        letters: grade.letters,
        plan: grade.plan,
        schedule: grade.schedule,
    }

    const validationSchema = Yup.object().shape({
        acceptability: Yup.number().min(0, 'Минималният брой точки е 0').max(1, 'Максималният брой точки е 1').required('Точките за допустимост са задължителни'),
        form: Yup.number().min(0, 'Минималният брой точки е 0').max(1, 'Максималният брой точки е 1').required('Точките за формуляр за кандидатстване са задължителни'),
        teachers: Yup.number().min(0, 'Минималният брой точки е 0').max(1, 'Максималният брой точки е 1').required('Точките за училищен екип са задължителни'),
        description: Yup.number().min(0, 'Минималният брой точки е 0').max(6, 'Максималният брой точки е 6').required('Точките за описание на проекта са задължителни'),
        budget: Yup.number().min(0, 'Минималният брой точки е 0').max(2, 'Максималният брой точки е 2').required('Точките за бюджет са задължителни'),
        students: Yup.number().min(0, 'Минималният брой точки е 0').max(3, 'Максималният брой точки е 3').required('Точките за списък на учениците са задължителни'),
        declarations: Yup.number().min(0, 'Минималният брой точки е 0').max(1, 'Максималният брой точки е 1').required('Точките за декларации на родителите са задължителни'),
        letters: Yup.number().min(0, 'Минималният брой точки е 0').max(1, 'Максималният брой точки е 1').required('Точките за мотивационни писма са задължителни'),
        plan: Yup.number().min(0, 'Минималният брой точки е 0').max(1, 'Максималният брой точки е 1').required('Точките за план за обучението са задължителни'),
        schedule: Yup.number().min(0, 'Минималният брой точки е 0').max(1, 'Максималният брой точки е 1').required('Точките за график са задължителни'),
    });

    const fields = [
        { type: 'number', name: 'acceptability', label: 'Допустимост', endAdornment: { text: '/1' } },
        { type: 'number', name: 'form', label: 'Формуляр за кандидатстване', endAdornment: { text: '/1' } },
        { type: 'number', name: 'teachers', label: 'Училищен екип', endAdornment: { text: '/1' } },
        { type: 'number', name: 'description', label: 'Описание на проекта', endAdornment: { text: '/6' } },
        { type: 'number', name: 'budget', label: 'Бюджет', endAdornment: { text: '/2' } },
        { type: 'number', name: 'students', label: 'Списък на учениците', endAdornment: { text: '/3' } },
        { type: 'number', name: 'declarations', label: 'Декларации на родителите', endAdornment: { text: '/1' } },
        { type: 'number', name: 'letters', label: 'Мотивационни писма', endAdornment: { text: '/1' } },
        { type: 'number', name: 'plan', label: 'План за обучението', endAdornment: { text: '/1' } },
        { type: 'number', name: 'schedule', label: 'График', endAdornment: { text: '/1' } },
    ];

    const onSubmit = (values, { setSubmitting }) => {
        groupService.grade(values, group.id)
            .then((res) => {
                addMessage('Групата е оценена успешно', 'success');
            })
            .catch((error) => {
                console.log(error);
            })

        setSubmitting(false);
    }

    const submitButton = {
        label: 'Запазване'
    }

    return (
        <>
            <Card sx={{ p: 2 }}>
                <Typography variant='h4'>{group.class}</Typography>
                <PerfectScrollbar>
                    <Box>
                        <FormBuilder
                            fields={fields}
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={onSubmit}
                            submitButton={submitButton}
                        />
                    </Box>
                </PerfectScrollbar>
            </Card>
        </>
    );
}

export default GradeItem;