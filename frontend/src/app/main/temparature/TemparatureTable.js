import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { motion } from 'framer-motion';
import DateTimeHelper from 'src/app/shared/helpers/DateTimeHelper';

function createData(value, timestamp) {
    return { value, timestamp };
}

const rows = [
    createData(25.7, '2023-05-01T18:39:00.000Z'),
    createData(25.9, '2023-05-01T18:38:00.000Z'),
    createData(26.5, '2023-05-01T18:37:00.000Z'),
    createData(26.6, '2023-05-01T18:36:00.000Z'),
    createData(27.0, '2023-05-01T18:35:00.000Z'),
    createData(26.3, '2023-05-01T18:34:00.000Z'),
    createData(26.2, '2023-05-01T18:33:00.000Z'),
    createData(26.6, '2023-05-01T18:32:00.000Z'),
    createData(25.8, '2023-05-01T18:31:00.000Z'),
    createData(25.6, '2023-05-01T18:30:00.000Z'),
];

const TemparatureTable = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
        >
            <TableContainer sx={{ marginLeft: 'auto', marginRight: 'auto' }} component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell className="font-extrabold uppercase">Value</TableCell>
                            <TableCell className="font-extrabold uppercase">Time</TableCell>
                            <TableCell className="font-extrabold uppercase">Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.timestamp}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>{row.value.toFixed(1)}&deg;C</TableCell>
                                <TableCell>{DateTimeHelper.getTime(row.timestamp)}</TableCell>
                                <TableCell>{DateTimeHelper.getDate(row.timestamp)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </motion.div>
    );
}

export default TemparatureTable;