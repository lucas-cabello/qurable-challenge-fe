import React from 'react';
import {User} from "../../api/users.ts";

interface UserDropdownProps {
    users: User[];
    isLoading: boolean;
    activeUserId: string;
    setActiveUserId: React.Dispatch<React.SetStateAction<string>>;
}

const UserDropdown: React.FC<UserDropdownProps> = ({users, isLoading, activeUserId, setActiveUserId}) => {
    if (isLoading) {
        return <div>Loading users...</div>;
    }

    return (
        <div className="flex flex-col space-y-2">
            <label className="font-medium text-gray-700">Select Active User</label>
            <select
                onChange={(e) => setActiveUserId(e.target.value)}
                value={activeUserId}
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-200"
            >
                <option value="" disabled>
                    Select a user
                </option>
                {users.map((user) => (
                    <option key={user._id} value={user._id}>
                        {user.firstname} {user.lastname}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default UserDropdown;
