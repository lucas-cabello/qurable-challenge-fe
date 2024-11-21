import React from 'react';
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {createCouponBook, getCouponBooks} from "../../api/coupon-books.ts";
import CouponBookForm from "./CouponBookForm.tsx";
import CouponBookTable from "./CouponBookTable.tsx";

const CouponBookManagement: React.FC = () => {
    const queryClient = useQueryClient();

    const {data: couponBooks, isLoading} = useQuery({
        queryKey: ['couponBooks'],
        queryFn: getCouponBooks,
    });

    const createCouponBookMutation = useMutation({
        mutationFn: createCouponBook,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['couponBooks']});
        },
    });

    if (isLoading) return <p className="text-center text-gray-600">Loading...</p>;

    return (
        <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Coupon Book Management</h1>
            <CouponBookForm onSubmit={(values) => createCouponBookMutation.mutate(values)}/>
            <h2 className="text-xl font-semibold text-gray-700 mt-10 mb-4">Coupon Books</h2>
            <CouponBookTable couponBooks={couponBooks || []}/>
        </div>
    );
};

export default CouponBookManagement;
