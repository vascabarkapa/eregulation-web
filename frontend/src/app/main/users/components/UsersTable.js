import * as React from 'react';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Tooltip } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon/FuseSvgIcon';
import { motion } from 'framer-motion';
import UsersDeleteModal from './UsersDeleteModal';
import UsersFormModal from './UsersFormModal';
import SnackbarAlert from 'src/app/shared/components/SnackbarAlert';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserService from 'src/app/shared/services/user-service';
import { useEffect } from 'react';
import FuseLoading from '@fuse/core/FuseLoading';
import { showMessage } from 'app/store/fuse/messageSlice';

const UsersTable = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isLoading, setIsloading] = useState(false);
    const [users, setUsers] = useState([]);
    const [tempUsers, setTempUsers] = useState([]);
    const [userToEdit, setUserToEdit] = useState({});
    const [userToDelete, setUserToDelete] = useState({});
    const [trigger, setTrigger] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const [openFormModal, setOpenFormModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openNotification, setOpenNotification] = useState(false);

    let pageSize = 10;
    let startIndex = (page - 1) * pageSize;
    let endIndex = startIndex + pageSize;

    useEffect(() => {
        setIsloading(true);
        UserService.getUsers().then((response) => {
            if (response) {
                setUsers(response?.data);
                setTempUsers(response?.data?.slice(startIndex, endIndex));
                setIsloading(false);
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

    function handleEditUser(user) {
        setUserToEdit(user);
        setOpenFormModal(true);
    };

    const handleForm = () => {

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
                                    {user?.username}
                                </TableCell>
                                <TableCell>{user?.first_name + " " + user?.last_name}</TableCell>
                                <TableCell>{user?.email}</TableCell>
                                <TableCell style={{ display: "flex", justifyContent: "right" }}>
                                    <Tooltip title="Edit" placement="top">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            type="button"
                                            size="small"
                                            className="mr-5 hover:bg-blue"
                                            onClick={() => handleEditUser(user)}
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
            {openFormModal && <UsersFormModal user={userToEdit} open={openFormModal} setOpen={setOpenFormModal}
                onConfirm={handleForm} />}
            {openDeleteModal && <UsersDeleteModal open={openDeleteModal} setOpen={setOpenDeleteModal}
                onConfirm={handleDelete} />}

            <div className="hidden md:block">
                {openNotification && <SnackbarAlert
                    open={openNotification}
                    setOpen={setOpenNotification}
                    vertical={'top'}
                    horizontal={'center'}
                    message={'This is some message'}
                    type={'success'}
                />
                }
            </div>
            <div className="block md:hidden">
                {openNotification && <SnackbarAlert
                    open={openNotification}
                    setOpen={setOpenNotification}
                    vertical={'bottom'}
                    horizontal={'center'}
                    message={'This is some message'}
                    type={'success'}
                />
                }
            </div>

        </motion.div>
    );
}

export default UsersTable;