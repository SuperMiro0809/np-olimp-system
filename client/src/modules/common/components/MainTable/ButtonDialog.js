import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from '@mui/material';

const ButtonDialog = ({
    selected,
    setSelected,
    selectedId,
    setSelectedId,
    dialog,
    newRequest,
    openDialog: open,
    setOpenDialog: setOpen
}) => {
    function handleClose() {
        setOpen(false);
        setSelectedId(0);
    }

    function handleOperation() {
        const handler = dialog.handler;

        if (selectedId) {
            handler([selectedId]);
            setSelectedId(0);
        } else {
            handler(selected);
            setSelected([]);
        }

        newRequest();
        setOpen(false);
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>{dialog.title || 'Операция'}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {dialog.contentText || 'Сигурни ли сте, че искате да извършите тази операция?'}
                    
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>
                    {dialog.closeText || 'Отмени'}
                </Button>
                <Button onClick={handleOperation}>
                    {dialog.agreeText || 'Извърши'}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ButtonDialog;