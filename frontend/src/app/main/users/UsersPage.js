import * as React from 'react';
import UsersHeader from './components/UsersHeader';
import UsersTable from './components/UsersTable';

const UsersPage = () => {
    return (
        <div className="container">
            <UsersHeader />
            <UsersTable />
        </div>
    );
}

export default UsersPage;