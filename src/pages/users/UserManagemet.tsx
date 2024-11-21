import React from 'react';
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {createUser, getUsers} from "../../api/users";
import UserForm from "./UserForm.tsx";
import UserTable from "./UserTable.tsx";

const UserManagement: React.FC = () => {
    const queryClient = useQueryClient();

    const {data: users, isLoading} = useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
    });

    const createUserMutation = useMutation({
        mutationFn: createUser,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['users']});
        },
    });

    const handleSubmit = (values: { firstname: string; lastname: string; email: string }) => {
        createUserMutation.mutate(values);
    };

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">User Management</h1>

            <UserForm onSubmit={handleSubmit}/>

            <h2 className="text-xl font-semibold text-gray-700 mt-8">Users</h2>
            {users && <UserTable users={users}/>}
        </div>
    );
};

export default UserManagement;
