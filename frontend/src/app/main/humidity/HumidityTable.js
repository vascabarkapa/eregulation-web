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
    createData(45.7, '2023-05-01T20:19:00.000Z'),
    createData(45.9, '2023-05-01T20:18:00.000Z'),
    createData(45.5, '2023-05-01T20:17:00.000Z'),
    createData(46.6, '2023-05-01T20:16:00.000Z'),
    createData(45.0, '2023-05-01T20:15:00.000Z'),
    createData(45.3, '2023-05-01T20:14:00.000Z'),
    createData(45.2, '2023-05-01T20:13:00.000Z'),
    createData(46.6, '2023-05-01T20:12:00.000Z'),
    createData(41.8, '2023-05-01T20:11:00.000Z'),
    createData(40.6, '2023-05-01T20:10:00.000Z'),
];

const HumidityTable = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
        >
            <TableContainer sx={{ width: '95%', marginLeft: 'auto', marginRight: 'auto', marginBottom: '2rem' }} component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small">
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
                                <TableCell>{row.value.toFixed(1)}%</TableCell>
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

export default HumidityTable;