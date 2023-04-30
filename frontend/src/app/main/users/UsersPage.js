import * as React from 'react';
import UsersHeader from './UsersHeader';
import UsersTable from './UsersTable';

export default function UsersPage() {
    return (
        <div className="container">
            <UsersHeader />
            <UsersTable />
        </div>
    );
}