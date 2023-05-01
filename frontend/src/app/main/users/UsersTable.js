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

function createData(first_name, last_name, username, email, actions) {
    return { first_name, last_name, username, email, actions };
}

const rows = [
    createData('John', 'Smith', 'johnsmith', 'john.smith@gmail.com', ''),
    createData('Emma', 'Johnson', 'emmajohnson', 'emma.johnson@gmail.com', ''),
    createData('Michael', 'Davis', 'michaeldavis', 'michael.davis@gmail.com', ''),
    createData('Sophia', 'Garcia', 'sophiagarcia', 'sophia.garcia@gmail.com', ''),
    createData('William', 'Brown', 'williambrown', 'william.brown@gmail.com', ''),
    createData('Isabella', 'Martinez', 'isabellamartinez', 'isabella.martinez@gmail.com', ''),
    createData('Ethan', 'Anderson', 'ethananderson', 'ethan.anderson@gmail.com', ''),
    createData('Olivia', 'Taylor', 'oliviataylor', 'olivia.taylor@gmail.com', ''),
    createData('Liam', 'Thomas', 'liamthomas', 'liam.thomas@gmail.com', ''),
    createData('Ava', 'Hernandez', 'avahernandez', 'ava.hernandez@gmail.com', ''),
];

const UsersTable = () => {
    const [openFormModal, setOpenFormModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    function handleOpenFormModal(user) {
        setOpenFormModal(true);
    };

    const handleForm = () => {
        setOpenFormModal(false);
        // delete api
    }

    function handleOpenDeleteModal(user) {
        setOpenDeleteModal(true);
    };

    const handleDelete = () => {
        setOpenDeleteModal(false);
        // delete api
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
        >
            <TableContainer sx={{ width: '95%', marginLeft: 'auto', marginRight: 'auto', marginBottom: '2rem' }} component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Full Name</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.email}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>{row.first_name + ' ' + row.last_name}</TableCell>
                                <TableCell>{row.username}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell align="right">
                                    <Tooltip title="Edit" placement="top">
                                        <Button
                                            variant="text"
                                            color="secondary"
                                            type="button"
                                            onClick={() => handleOpenFormModal(row)}
                                        >
                                            <FuseSvgIcon>
                                                heroicons-solid:pencil-alt
                                            </FuseSvgIcon>
                                        </Button>
                                    </Tooltip>
                                    <Tooltip title="Delete" placement="top">
                                        <Button
                                            variant="text"
                                            color="secondary"
                                            type="button"
                                            onClick={() => handleOpenDeleteModal(row)}
                                        >
                                            <FuseSvgIcon>
                                                heroicons-solid:trash
                                            </FuseSvgIcon>
                                        </Button>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {openFormModal && <UsersFormModal open={openFormModal} setOpen={setOpenFormModal}
                onConfirm={handleForm} />}
            {openDeleteModal && <UsersDeleteModal open={openDeleteModal} setOpen={setOpenDeleteModal}
                onConfirm={handleDelete} />}
        </motion.div>
    );
}

export default UsersTable;