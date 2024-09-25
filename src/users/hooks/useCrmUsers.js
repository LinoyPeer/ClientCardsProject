import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSnack } from '../../providers/SnackbarProvider';
import { useCurrentUser } from '../providers/UserProvider';

const useCrmUsers = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [selected, setSelected] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const setSnack = useSnack();
    const { token } = useCurrentUser();

    useEffect(() => {
        const getAllUsers = async () => {
            try {
                if (!token) {
                    throw new Error('Token not found');
                }
                const response = await axios.get('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users', {
                    headers: { 'x-auth-token': token }
                });
                setUsers(response.data);
            } catch (error) {
                setError(error.message);
                console.log('Error getting all users:', error);
            }
        };
        getAllUsers();
    }, []);

    const patchUser = async (user) => {
        if (!token) {
            throw new Error('Token not found');
        }
        try {
            await axios.patch(
                `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${user._id}`,
                { isBusiness: true },
                {
                    headers: {
                        'x-auth-token': token
                    }
                }
            );
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    };
    const handleEditSelectedUsers = async () => {
        const toUpdate = users.filter(user => selected.includes(user._id));

        if (toUpdate.length > 0) {
            await Promise.all(
                toUpdate.map(user => patchUser({ ...user, isBusiness: !user.isBusiness }))
            );

            setUsers(prev => prev.map(user => {
                if (toUpdate.some(toUpdateUser => toUpdateUser._id === user._id)) {
                    return { ...user, isBusiness: !user.isBusiness };
                }
                return user;
            }));
            setSnack("success", "Selected users have been updated");
        } else {
            setSnack("info", "No users to update");
        }
    };


    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = users.map((row) => row._id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleDeleteAllSelected = async () => {
        const toDelete = users.filter(user => selected.includes(user._id))
        if (toDelete.length) {
            await Promise.all(
                toDelete.map(user => handleDeleteUsers(user._id))
            );
            setUsers(prev => prev.filter(user => !toDelete.some(toDeleteUser => toDeleteUser._id === user._id)));
            setSelected([]);
        }
    };

    const handleClick = (id) => {
        setSelected(prev => {
            const isSelected = prev.indexOf(id) !== -1;
            return isSelected ? prev.filter(selectedId => selectedId !== id) : [...prev, id];
        });
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    const handleDeleteUsers = async (id) => {
        if (!confirm('ARE YOU SURE YOU WANT TO DELETE THIS USER?')) return;
        try {
            const token = localStorage.getItem('my token');
            if (!token) {
                throw new Error('Token not found');
            }
            await axios.delete(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${id}`, {
                headers: { 'x-auth-token': token }
            });
            setUsers(prev => prev.filter(user => user._id !== id));
            setSnack("success", "User has been deleted");
        } catch (error) {
            setError(error.message);
            setSnack("error", "You are NOT allowed to delete an Admin user!");
            throw new Error("You are NOT allowed to delete an Admin user!");
        }
    };

    return { users, error, handleDeleteUsers, setUsers, isSelected, handleChangeRowsPerPage, handleChangePage, handleClick, handleDeleteAllSelected, handleSelectAllClick, page, rowsPerPage, selected, handleEditSelectedUsers };
};

export default useCrmUsers;
