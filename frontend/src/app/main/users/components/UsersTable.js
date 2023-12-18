import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { Button, Tooltip, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { showMessage } from 'app/store/fuse/messageSlice';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon/FuseSvgIcon';
import UsersDeleteModal from './UsersDeleteModal';
import UsersFormModal from './UsersFormModal';
import UserService from 'src/app/shared/services/user-service';
import FuseLoading from '@fuse/core/FuseLoading';

const UsersTable = () => {
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [tempUsers, setTempUsers] = useState([]);
    const [userToEdit, setUserToEdit] = useState(null);
    const [userToDelete, setUserToDelete] = useState(null);
    const [trigger, setTrigger] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const [openFormModal, setOpenFormModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    let pageSize = 10;
    let startIndex = (page - 1) * pageSize;
    let endIndex = startIndex + pageSize;

    useEffect(() => {
        setIsLoading(true);
        UserService.getUsers().then((response) => {
            if (response) {
                setUsers(response?.data);
                setTempUsers(response?.data?.slice(startIndex, endIndex));
                setIsLoading(false);
                setTotalPages(Math.ceil(response?.data?.length / pageSize));
            }
        })
    }, [trigger]);

    useEffect(() => {
        setTempUsers(users?.slice(startIndex, endIndex));
    }, [page]);

    const handleChangePage = (event, value) => {
        setPage(value);
    };

    function handleOpenDeleteModal(user) {
        setUserToDelete(user);
        setOpenDeleteModal(true);
    };

    function handleOpenFormUser(user) {
        setUserToEdit(user);
        setOpenFormModal(true);
    };

    const handleForm = (body) => {
        if (userToEdit) {
            UserService.updateUser(userToEdit._id, body).then((response) => {
                if (response) {
                    setTrigger(!trigger);
                    setPage(1);
                    setIsLoading(false);
                    setOpenFormModal(false);
                    dispatch(showMessage({ message: "Updated User successfully!" }));
                }
            })
        } else {
            UserService.createUser(body).then((response) => {
                if (response) {
                    setTrigger(!trigger);
                    setPage(1);
                    setIsLoading(false);
                    setOpenFormModal(false);
                    dispatch(showMessage({ message: "Added new User successfully!" }));
                }
            });
        }
    }

    const handleDelete = () => {
        UserService.deleteUser(userToDelete?._id).then((response) => {
            if (response) {
                setOpenDeleteModal(false);
                dispatch(showMessage({ message: "User successfully deleted!" }));
                setTrigger(!trigger);
                setPage(1);
            }
        })
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
        >
            <div className="flex flex-col sm:flex-row space-y-16 sm:space-y-0 w-full items-center justify-between py-32  px-24 sm:px-32">
                <Typography
                    component={motion.span}
                    initial={{ x: -20 }}
                    animate={{ x: 0, transition: { delay: 0.2 } }}
                    delay={300}
                    className="text-24 md:text-32 font-extrabold tracking-tight mx-16"
                >
                    Users
                </Typography>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
                    className="mx-16"
                >
                    <Button
                        size="large"
                        onClick={() => handleOpenFormUser(null)}
                        variant="contained"
                        color="secondary"
                        startIcon={<FuseSvgIcon>feather:user-plus</FuseSvgIcon>}
                    >
                        Add User
                    </Button>
                </motion.div>
            </div>
            {!isLoading ? <TableContainer sx={{ width: '95%', marginLeft: 'auto', marginRight: 'auto', marginBottom: '2rem' }} component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell className="font-extrabold uppercase">Full Name</TableCell>
                            <TableCell className="font-extrabold uppercase">Username</TableCell>
                            <TableCell className="font-extrabold uppercase">Email</TableCell>
                            <TableCell className="font-extrabold uppercase"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tempUsers?.length > 0 ? tempUsers.map((user) => (
                            <TableRow
                                key={user?._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                className="hover:bg-gray-900"
                            >
                                <TableCell component="th" scope="row">
                                    {user?.first_name + " " + user?.last_name}
                                </TableCell>
                                <TableCell>{user?.username}</TableCell>
                                <TableCell>{user?.email}</TableCell>
                                <TableCell style={{ display: "flex", justifyContent: "right" }}>
                                    <Tooltip title="Edit" placement="top">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            type="button"
                                            size="small"
                                            className="mr-5 hover:bg-blue"
                                            onClick={() => handleOpenFormUser(user)}
                                        >
                                            <FuseSvgIcon>
                                                heroicons-solid:pencil-alt
                                            </FuseSvgIcon>
                                        </Button>
                                    </Tooltip>
                                    <Tooltip title="Delete" placement="top">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            type="button"
                                            size="small"
                                            className="hover:bg-red"
                                            onClick={() => handleOpenDeleteModal(user)}
                                        >
                                            <FuseSvgIcon>
                                                heroicons-solid:trash
                                            </FuseSvgIcon>
                                        </Button>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        )) : <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            className="hover:bg-gray-900"
                        >
                            <TableCell colSpan={6} className="text-center" component="th" scope="row">
                                No users available
                            </TableCell></TableRow>}
                    </TableBody>
                    {users?.length > 10 && <TableFooter>
                        <TableRow>
                            <TableCell colSpan={6} className="text-center" component="th" scope="row">
                                <Pagination count={totalPages} page={page} onChange={handleChangePage} color="secondary" />
                            </TableCell>
                        </TableRow>
                    </TableFooter>}
                </Table>
            </TableContainer> : <FuseLoading />}
            {openFormModal && <UsersFormModal user={userToEdit} setUser={setUserToEdit} open={openFormModal} setOpen={setOpenFormModal}
                onConfirm={handleForm} />}
            {openDeleteModal && <UsersDeleteModal open={openDeleteModal} setOpen={setOpenDeleteModal}
                onConfirm={handleDelete} />}
        </motion.div>
    );
}

export default UsersTable;