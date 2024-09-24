import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Checkbox,
    Paper,
    IconButton,
    Tooltip,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import useCrmUsers from '../hooks/useCrmUsers';
import DeleteIcon from "@mui/icons-material/Delete";
import { PublishedWithChanges } from '@mui/icons-material';
import PageHeader from '../../components/PageHeader';

export default function CrmUsers() {
    const { users, handleDeleteUsers, isSelected, handleChangeRowsPerPage, handleChangePage, handleClick, handleDeleteAllSelected, handleSelectAllClick, page, rowsPerPage, selected, handleEditSelectedUsers } = useCrmUsers();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const getStatusText = (user) => {
        if (user.isAdmin && user.isBusiness) return 'Admin & Business';
        if (user.isAdmin) return 'Admin';
        if (user.isBusiness) return 'Business';
        return 'Regular User';
    };

    const renderTableHeader = () => (
        <TableHead>
            <TableRow sx={{ backgroundColor: "#918A87" }}>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={selected.length > 0 && selected.length < users.length}
                        checked={users.length > 0 && selected.length === users.length}
                        onChange={handleSelectAllClick}
                        sx={{
                            transition: 'all 0.3s ease-in-out',
                            backgroundColor: "#000",
                            "&:hover": {
                                backgroundColor: "#F1E8CF", // צבע רקע ב-hover
                            },
                        }}
                    />
                </TableCell>
                {!isMobile && (
                    <>
                        <TableCell sx={{ color: "#000" }}>ID</TableCell>
                        <TableCell sx={{ color: "#000" }}>First name</TableCell>
                        <TableCell sx={{ color: "#000" }}>Last name</TableCell>
                        <TableCell sx={{ color: "#000" }}>Status</TableCell>
                        <TableCell sx={{ color: "#000" }}>Phone</TableCell>
                    </>
                )}
                {isMobile && (
                    <TableCell sx={{ color: "#000" }}>User Info</TableCell>
                )}
            </TableRow>
        </TableHead>
    );

    const renderTableBody = () => (
        <TableBody>
            {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                    const isItemSelected = isSelected(row._id);
                    return (
                        <TableRow
                            hover
                            onClick={() => handleClick(row._id)}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row._id}
                            selected={isItemSelected}
                        >
                            <TableCell padding="checkbox">
                                <Checkbox checked={isItemSelected} />
                            </TableCell>
                            {!isMobile ? (
                                <>
                                    <TableCell>{row._id}</TableCell>
                                    <TableCell>{row.name.first}</TableCell>
                                    <TableCell>{row.name.last}</TableCell>
                                    <TableCell>{getStatusText(row)}</TableCell>
                                    <TableCell>{row.phone}</TableCell>
                                </>
                            ) : (
                                <TableCell>
                                    <strong>{row.name.first} {row.name.last}</strong><br />
                                    Status: {getStatusText(row)}<br />
                                    Phone: {row.phone}
                                </TableCell>
                            )}
                        </TableRow>
                    );
                })}
        </TableBody>
    );

    return (
        <>
            <PageHeader
                title="CRM Admin"
                subtitle="On this page you can edit the users status and delete them"
            />
            <Paper>
                <TableContainer>
                    <Table size={isMobile ? "small" : "medium"}>
                        {renderTableHeader()}
                        {renderTableBody()}
                    </Table>
                </TableContainer>
                <TablePagination
                    component="div"
                    count={users.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={isMobile ? [5, 10, 25] : [5, 10, 25, 100, 1300]}
                />
                <Tooltip title="Delete selected users" sx={{ marginLeft: "1rem" }}>
                    <IconButton onClick={handleDeleteAllSelected}>
                        <DeleteIcon sx={{ fontSize: isMobile ? "20x" : "20px", color: "#918A87" }} />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Switching user's status" sx={{ marginRight: "1rem" }}>
                    <IconButton onClick={handleEditSelectedUsers}>
                        <PublishedWithChanges sx={{ fontSize: isMobile ? "20px" : "20px", color: "#918A87" }} />
                    </IconButton>
                </Tooltip>
            </Paper>
        </>
    );
}