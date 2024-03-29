import { useState, useEffect } from 'react';
import {
    Box,
    Tooltip,
    Table,
    TableBody,
    TableRow,
    TableCell,
    TablePagination,
    Checkbox,
    IconButton,
    Button,
    TextField,
    Grid,
    Chip,
    Switch,
    Autocomplete
} from '@mui/material';
import { makeStyles, withStyles, styled } from '@mui/styles';
import { Link as RouterLink } from 'react-router-dom';
import EnhancedTableHead from './EnhancedTableHead';
import ChipColumn from './ChipColumn';
import Pagination from '@modules/common/components/Pagination/Pagination';
import PropTypes from 'prop-types';
import ButtonDialog from './ButtonDialog';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

const FiltersTableRow = withStyles(theme => ({
    root: {
        backgroundColor: theme.palette.primary.grey
    }
}))(TableRow);

const CustomSwitch = styled(Switch)(({ theme }) => ({
    padding: 8,
    '& .MuiSwitch-track': {
        borderRadius: 22 / 2,
        '&:before, &:after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 16,
            height: 16,
        },
        '&:before': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.getContrastText(theme.palette.primary.main),
            )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
            left: 12,
        },
        '&:after': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.getContrastText(theme.palette.primary.main),
            )}" d="M19,13H5V11H19V13Z" /></svg>')`,
            right: 12,
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: 'none',
        width: 16,
        height: 16,
        margin: 2,
    },
}));

const MainTable = ({
    rows,
    total,
    headings,
    headFilters = {},
    method,
    deleteHandler,
    options = {
        checkbox: false,
        add: false,
        delete: false,
        edit: false,
        details: false
    },
    customOptions = [],
    actionButtons = [],
    itemOptionsKey = '',
    routeName = '',
    dense,
    rowClick
}) => {
    const classes = useStyles();

    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [order, setOrder] = useState();
    const [orderBy, setOrderBy] = useState();
    const [searches, setSearches] = useState(
        headings.map((heading, index) => ({
            value: '',
            label: heading.id,
        }))
    );
    const [openDialog, setOpenDialog] = useState(false);
    const [dialog, setDialog] = useState(null);
    const [selectedId, setSelectedId] = useState(0);
    const [allColsNum, setAllColsNum] = useState(headings.length);

    const deleteDialog = {
        title: 'Изтриване',
        contentText: 'Сигурни ли сте, че искате да изтриете?',
        agreeText: 'Изтрий'
    }

    const newRequest = () => {
        method(page, rowsPerPage, searches, { field: orderBy, direction: order });
    }

    useEffect(() => {
        newRequest();

        let colsNum = headings.length;

        if (options.delete) {
            colsNum++;
        }

        if (options.edit) {
            colsNum++;
        }

        if (options.checkbox) {
            colsNum++;
        }

        if (options.details) {
            colsNum++;
        }

        if(customOptions.length > 0) {
            customOptions.map((el) => colsNum++);
        }

        setAllColsNum(colsNum);

    }, [page, rowsPerPage, searches, order, orderBy])


    const handleSearchChange = (index) => (event, newValue) => {
        const newSearches = [...searches];
        newSearches[index].value = newValue ? newValue.value : event.target.value || '';
        setSearches(newSearches);
    };

    // const handleChangePage = (event, newPage) => {
    //     setPage(newPage);
    // };

    // const handleChangeRowsPerPage = (event) => {
    //     setRowsPerPage(event.target.value);
    //     setPage(0);
    // };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        const direction = isAsc ? 'desc' : 'asc';
        setOrder(direction);
        setOrderBy(property);
    };

    const handleRowClick = (event, id) => {
        if (rowClick) {
            rowClick(id);
        }
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((row) => row.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
    };

    const handleOpenDialog = (dialog, handler, id = 0) => {
        let d = { ...dialog, handler };

        setSelectedId(id);
        setOpenDialog(true);
        setDialog(d)
    }

    const itemOption = (item, option) => {
        if (itemOptionsKey && item[itemOptionsKey]) {
            return Object.hasOwn(item[itemOptionsKey], option) && item[itemOptionsKey][option];
        }
        if (!itemOptionsKey && Object.hasOwn(item, option)) {
            return item[option];
        }

        return options[option];
    }

    return (
        <Box>
            {(options.delete || options.add || actionButtons.length > 0) && (
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mb: 3 }}>
                    {actionButtons.map((button, index) => (
                        <Button
                            variant={button.variant || 'contained'}
                            color={button.color || 'primary'}
                            textcolor={button.textColor || 'primary'}
                            disabled={selected.length === 0}
                            onClick={() => {
                                const handler = button.handler;

                                if (button.dialog) {
                                    handleOpenDialog(button.dialog, handler)
                                } else {
                                    handler(selected);
                                    newRequest();
                                }
                            }}
                            startIcon={button.startIcon}
                            endIcon={button.endIcon}
                            key={index}
                        >
                            {button.label}
                        </Button>
                    ))}

                    {options.delete && (
                        <>
                            <Button
                                variant='outlined'
                                color='lightBlue'
                                textcolor='lightBlue'
                                disabled={selected.length === 0}
                                onClick={() => handleOpenDialog(deleteDialog, deleteHandler)}
                            >
                                Изтриване на избраните
                            </Button>
                        </>
                    )}

                    {options.add && (
                        <Button
                            component={RouterLink}
                            variant='contained'
                            color='lightBlue'
                            textcolor='lightBlue'
                            startIcon={<AddIcon />}
                            to={routeName ? routeName + '/create' : 'create'}
                        >
                            Добави
                        </Button>
                    )}

                </Box>
            )}

            {dialog && (
                <ButtonDialog
                    selected={selected}
                    setSelected={setSelected}
                    selectedId={selectedId}
                    setSelectedId={setSelectedId}
                    dialog={dialog}
                    newRequest={newRequest}
                    openDialog={openDialog}
                    setOpenDialog={setOpenDialog}
                />
            )}

            <Table
                className={classes.table}
                aria-labelledby='tableTitle'
                size={dense ? 'small' : 'medium'}
            >
                <EnhancedTableHead
                    searches={searches}
                    handleSearchChange={handleSearchChange}
                    options={options}
                    customOptions={customOptions}
                    classes={classes}
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length}
                    headings={headings}
                    headFilters={headFilters}
                />
                <TableBody>
                    {Object.keys(headFilters).length > 0 && (
                        <FiltersTableRow>
                            {options.checkbox && (
                                <TableCell></TableCell>
                            )}

                            {headings.map((heading, index) => {
                                if (headFilters[heading.id]) {
                                    return (
                                        <TableCell key={heading.id} sx={{ pt: 0.5 }}>
                                            {headFilters[heading.id].type === 'search' && (
                                                <TextField
                                                    placeholder={headFilters[heading.id].placeholder}
                                                    value={searches[index].value}
                                                    onChange={handleSearchChange(index)}
                                                    size='small'
                                                    fullWidth
                                                    sx={{ backgroundColor: 'white' }}
                                                />
                                            )}
                                            {headFilters[heading.id].type === 'select' && (
                                                // <TextField
                                                //     select
                                                //     value={searches[index].value || 'none'}
                                                //     onChange={handleSearchChange(index)}
                                                //     size='small'
                                                //     fullWidth
                                                //     sx={{ backgroundColor: 'white' }}
                                                // >
                                                //     <MenuItem value="none" disabled>{headFilters[heading.id].placeholder}</MenuItem>
                                                //     {headFilters[heading.id].options.map((option) => (
                                                //         <MenuItem key={option.value} value={option.value}>
                                                //             {option.label}
                                                //         </MenuItem>
                                                //     ))}
                                                // </TextField>
                                                <Autocomplete
                                                    disablePortal
                                                    options={headFilters[heading.id].options}
                                                    sx={{ backgroundColor: 'white' }}
                                                    onChange={handleSearchChange(index)}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            placeholder={headFilters[heading.id].placeholder}
                                                            size='small'
                                                        />
                                                    )}
                                                />
                                            )}
                                        </TableCell>
                                    );
                                } else {
                                    return <TableCell key={heading.id} sx={{ pt: 0.5 }}></TableCell>
                                }
                            })}

                            {customOptions.map((option, index) => (
                                 <TableCell key={index}></TableCell>
                            ))}

                            {options.details && (
                                <TableCell></TableCell>
                            )}

                            {options.edit && (
                                <TableCell></TableCell>
                            )}

                            {options.delete && (
                                <TableCell></TableCell>
                            )}
                        </FiltersTableRow>
                    )}

                    {rows.length > 0 ? (
                        <>
                            {rows.map((row, index) => {
                                const isItemSelected = isSelected(row.id);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => handleRowClick(event, row.id)}
                                        role='checkbox'
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.id}
                                        selected={isItemSelected}
                                    >
                                        {options.checkbox && (
                                            <TableCell padding='checkbox'>
                                                <Checkbox
                                                    color='lightBlue'
                                                    checked={isItemSelected}
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                    onClick={(event) => event.stopPropagation()}
                                                    onChange={(event) => handleClick(event, row.id)}
                                                />
                                            </TableCell>
                                        )}
                                        {headings.map((heading) => {
                                            const value = row[heading.id];
                                            const { type = 'text' } = heading;

                                            if (type === 'array') {
                                                return (
                                                    <TableCell key={heading.id} align={heading.align} style={{ maxHeight: "20px", overflow: "hidden" }}>
                                                        <Grid container spacing={1}>

                                                            {value.map((element, index) => {
                                                                const name = element[heading.arrayId][heading.selector];

                                                                return (
                                                                    <Grid item key={index}>
                                                                        <Tooltip title={name}>
                                                                            <Chip label={name} sx={{ maxWidth: '150px' }} />
                                                                        </Tooltip>
                                                                    </Grid>
                                                                );
                                                            })}

                                                        </Grid>
                                                    </TableCell>
                                                );
                                            } else if (type === 'switch') {
                                                const handler = heading.handler;

                                                return (
                                                    <TableCell key={heading.id} align={heading.align} style={{ maxHeight: "20px", overflow: "hidden" }}>
                                                        <CustomSwitch
                                                            checked={!!value}
                                                            onChange={(event) => {
                                                                handler(event, row.id);
                                                                newRequest();
                                                            }}
                                                        />
                                                    </TableCell>
                                                );
                                            } else if (type === 'chip') {
                                                return (
                                                    <TableCell key={heading.id} align={heading.align} style={{ maxHeight: "20px", overflow: "hidden" }}>
                                                        <ChipColumn
                                                            value={value}
                                                            select={heading.select}
                                                            options={heading.options}
                                                            handler={heading.handler}
                                                            newRequest={newRequest}
                                                            row={row}
                                                        />
                                                    </TableCell>
                                                );
                                            } else if (type === 'button') {
                                                const handler = heading.handler;

                                                return (
                                                    <TableCell key={heading.id} align={heading.align} style={{ maxHeight: "20px", overflow: "hidden" }}>
                                                        <Button
                                                            variant={heading.button && Object.hasOwn(heading.button, 'variant') ? heading.button.variant : 'contained'}
                                                            color={heading.button && Object.hasOwn(heading.button, 'color') ? heading.button.color : 'primary'}
                                                            textcolor={heading.button && Object.hasOwn(heading.button, 'textColor') ? heading.button.textColor : 'primary'}
                                                            onClick={() => handleOpenDialog(heading['dialog'], handler, row.id)}
                                                            disabled={!!value}
                                                        >
                                                            {heading.button && Object.hasOwn(heading.button, 'label') ? heading.button.label : heading.label}
                                                        </Button>
                                                    </TableCell>
                                                );
                                            } else {

                                                return (
                                                    <TableCell key={heading.id} align={heading.align} style={{ maxHeight: "20px", overflow: "hidden" }}>
                                                        <Tooltip title={value}>
                                                            <span>{value}</span>
                                                        </Tooltip>
                                                    </TableCell>
                                                );
                                            }
                                        })}
                                        {customOptions.map((option, index) => {
                                            const { icon: Icon } = option;

                                            return (
                                                <TableCell align='right' key={index}>
                                                    <IconButton
                                                        color={option.color || ''}
                                                        component={RouterLink}
                                                        to={routeName ? routeName + `/${option.name}/${row.id}` : `${option.name}/${row.id}`}
                                                        disabled={!itemOption(row, option.name)}
                                                    >
                                                        <Icon />
                                                    </IconButton>
                                                </TableCell>
                                            );
                                        })}
                                        {options.details && (
                                            <TableCell align='right'>
                                                <IconButton
                                                    component={RouterLink}
                                                    to={routeName ? routeName + `/${row.id}/details` : `${row.id}/details`}
                                                    disabled={!itemOption(row, 'details')}
                                                >
                                                    <MeetingRoomIcon />
                                                </IconButton>
                                            </TableCell>
                                        )}
                                        {options.edit && (
                                            <TableCell align='right'>
                                                <IconButton
                                                    component={RouterLink}
                                                    to={routeName ? routeName + `/edit/${row.id}` : `edit/${row.id}`}
                                                    disabled={!itemOption(row, 'edit')}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                            </TableCell>
                                        )}
                                        {options.delete && (
                                            <TableCell align='right'>
                                                <IconButton
                                                    color='error'
                                                    onClick={() => handleOpenDialog(deleteDialog, deleteHandler, row['id'])}
                                                    disabled={!itemOption(row, 'delete')}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        )}
                                    </TableRow>
                                );
                            })}
                        </>
                    ) : (
                        <TableRow>
                            <TableCell colSpan={allColsNum} sx={{ textAlign: 'center' }}>Няма записи</TableCell>
                        </TableRow>
                    )}

                </TableBody>
            </Table>

            {/* <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={total}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage='Редове на страница'
                sx={{
                    marginleft: "auto",
                    marginRight: "auto",
                }}
            /> */}

            <Pagination
                total={total}
                page={page}
                setPage={setPage}
                rows={rowsPerPage}
                setRows={setRowsPerPage}
            />
        </Box>
    );
};

MainTable.propTypes = {
    rows: PropTypes.array.isRequired,
    total: PropTypes.number.isRequired,
    headings: PropTypes.array.isRequired,
    headFilters: PropTypes.object,
    method: PropTypes.func.isRequired,
    deleteHandler: PropTypes.func,
    options: PropTypes.shape({
        checkbox: PropTypes.bool,
        add: PropTypes.bool,
        delete: PropTypes.bool,
        edit: PropTypes.bool
    }),
    routeName: PropTypes.string
}

export default MainTable;