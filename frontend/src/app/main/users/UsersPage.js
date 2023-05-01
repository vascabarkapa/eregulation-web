import * as React from 'react';
import UsersHeader from './UsersHeader';
import UsersTable from './UsersTable';

const UsersPage = () => {
    return (
        <div className="container">
            <UsersHeader />
            <UsersTable />
        </div>
    );
}

export default UsersPage;