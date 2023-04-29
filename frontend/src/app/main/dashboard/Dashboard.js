import DashboardHeader from "./DashboardHeader";
import FusePageSimple from '@fuse/core/FusePageSimple';
import _ from '@lodash';
import { styled } from '@mui/material/styles';

const Root = styled(FusePageSimple)(({ theme }) => ({
    '& .FusePageSimple-header': {
        backgroundColor: theme.palette.background.paper,
        boxShadow: `inset 0 0 0 1px  ${theme.palette.divider}`,
    },
}));

const Dashboard = () => {
    return (
        <Root
            header={<DashboardHeader />}
            content={
                <div className="p-24">
                    Coming soon!
                </div>
            }
        />

    );
}

export default Dashboard;
