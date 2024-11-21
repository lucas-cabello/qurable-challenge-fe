import React from 'react';
import {User} from "../../api/users";

interface UserRowProps {
    user: User;
}

const UserRow: React.FC<UserRowProps> = ({user}) => (
    <tr className="border-t border-gray-200">
        <td className="py-2 px-4 text-sm text-gray-700">{user._id}</td>
        <td className="py-2 px-4 text-sm text-gray-700">{user.firstname}</td>
        <td className="py-2 px-4 text-sm text-gray-700">{user.lastname}</td>
        <td className="py-2 px-4 text-sm text-gray-700">{user.email}</td>
        <td className="py-2 px-4 text-sm text-gray-700">
            {user.coupons.filter(c => !c.used).map(c => (
                <div key={c.code} className="mb-2">
                    {/*<div>{c.code} {c.discount}% {c.used ? "Used" : "Available"}</div>*/}
                    <div>{c.code}</div>
                </div>
            ))}
        </td>
    </tr>
);

export default UserRow;
