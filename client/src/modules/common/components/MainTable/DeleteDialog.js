import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from '@mui/material';
import PropTypes from 'prop-types';

const DeleteDialog = ({
    selected,
    setSelected,
    deleteId,
    setDeleteId,
    deleteHandler,
    newRequest,
    open,
    setOpen
}) => {

    function handleClose() {
        setOpen(false);
        setDeleteId(0);
    }

    function handleDelete() {
        if (deleteId) {
            deleteHandler([deleteId]);
            setDeleteId(0);
        } else {
            deleteHandler(selected);
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
            <DialogTitle>Изтрий</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Сигурни ли сте, че искате да изтриете?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>
                    Отмени
                </Button>
                <Button onClick={handleDelete}>
                    Изтрий
                </Button>
            </DialogActions>
        </Dialog>
    )
}

DeleteDialog.propTypes = {
    selected: PropTypes.array.isRequired,
    setSelected: PropTypes.func.isRequired,
    deleteId: PropTypes.number.isRequired,
    setDeleteId: PropTypes.func.isRequired,
    deleteHandler: PropTypes.func.isRequired,
    newRequest: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired
}

export default DeleteDialog;