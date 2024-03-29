import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {motion} from 'framer-motion';
import DateTimeHelper from 'src/app/shared/helpers/DateTimeHelper';
import FuseLoading from "@fuse/core/FuseLoading";
import {Pagination, TableFooter} from "@mui/material";
import LightDataHelper from "../../../shared/helpers/LightDataHelper";

const LightTable = ({tempLightData, lightData, totalPages, page, handleChangePage}) => {
    return (
        <motion.div
            initial={{opacity: 0, y: 40}}
            animate={{opacity: 1, y: 0, transition: {delay: 0.2}}}
        >
            <TableContainer sx={{marginLeft: 'auto', marginRight: 'auto'}} component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell className="font-extrabold uppercase">Date</TableCell>
                            <TableCell className="font-extrabold uppercase">Time</TableCell>
                            <TableCell className="font-extrabold uppercase">Value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tempLightData?.length > 0 ? tempLightData.map((light) => (
                            <TableRow
                                key={light?._id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell>{DateTimeHelper.getDate(light?.createdAt)}</TableCell>
                                <TableCell>{DateTimeHelper.getTimeWithSeconds(light?.createdAt)}</TableCell>
                                <TableCell>{LightDataHelper.getModeValue(light?.value)}</TableCell>
                            </TableRow>
                        )) : <TableRow
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell colSpan={3} className="text-center" component="th" scope="row">
                                No Light Data available
                            </TableCell></TableRow>}
                    </TableBody>
                    {lightData?.length > 10 && <TableFooter>
                        <TableRow>
                            <TableCell colSpan={3} className="text-center border-0" component="th" scope="row">
                                <Pagination count={totalPages} page={page} onChange={handleChangePage}
                                            color="secondary"/>
                            </TableCell>
                        </TableRow>
                    </TableFooter>}
                </Table>
            </TableContainer>
        </motion.div>
    );
}

export default LightTable;