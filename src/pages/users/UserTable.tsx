import React from 'react';
import UserRow from "./UserRow.tsx";
import {User} from "../../api/users.ts";

interface UserTableProps {
    users: User[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => (
    <table className="min-w-full mt-4 table-auto">
        <thead>
        <tr className="bg-gray-100">
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">ID</th>
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Firstname</th>
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Lastname</th>
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Email</th>
            <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Available Coupons</th>
        </tr>
        </thead>
        <tbody>
        {users.map((user) => (
            <UserRow key={user._id} user={user} />
        ))}
        </tbody>
    </table>
);

export default UserTable;
