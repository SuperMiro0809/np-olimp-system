import { Box, Button } from '@mui/material';

const FormMenuControls = ({
    menus,
    index,
    submitButton,
    isSubmitting,
    handleTabChange,
    touched,
    errors
}) => {
    return (
        <>
            {index + 1 === menus.length ? (
                <Box sx={{ py: 2 }}>
                    <Button
                        color={submitButton && submitButton.color ? submitButton.color : 'primary'}
                        size={submitButton && submitButton.size ? submitButton.size : 'large'}
                        variant={submitButton && submitButton.variant ? submitButton.variant : 'contained'}
                        fullWidth={submitButton && Object.hasOwn(submitButton, 'fullWidth') ? submitButton.fullWidth : true}
                        disabled={isSubmitting}
                        type="submit"
                    >
                        {submitButton && submitButton.label ? submitButton.label : 'Добави'}
                    </Button>
                </Box>
            ) : (
                <Box sx={{ py: 2 }}>
                    <Button
                        color={submitButton && submitButton.color ? submitButton.color : 'primary'}
                        size={submitButton && submitButton.size ? submitButton.size : 'large'}
                        variant={submitButton && submitButton.variant ? submitButton.variant : 'contained'}
                        fullWidth={submitButton && Object.hasOwn(submitButton, 'fullWidth') ? submitButton.fullWidth : true}
                        disabled={isSubmitting}
                        onClick={() => handleTabChange(index + 1, touched, errors)}
                        type="button"
                    >
                        Напред
                    </Button>
                </Box>
            )}
        </>
    );
}

export default FormMenuControls;