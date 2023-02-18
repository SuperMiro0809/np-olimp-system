import { Alert, IconButton, Collapse } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import useMessage from '@modules/common/hooks/useMessage';

const Message = () => {
    const { message, removeMessage } = useMessage();

    return (
        <Collapse in={!!message} sx={{ position: 'fixed', right: 30, zIndex: 1 }}>
            {!!message &&
                <Alert
                    severity={message.status}
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                removeMessage();
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                >
                    {message.text}
                </Alert>
            }
        </Collapse>
    );
};

export default Message;