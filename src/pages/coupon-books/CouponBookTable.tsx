import React from 'react';
import {assignCoupon, CouponBook} from "../../api/coupon-books.ts";
import {Field, Form, Formik} from "formik";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-toastify";

interface CouponBookTableProps {
    couponBooks: CouponBook[];
}

const CouponBookTable: React.FC<CouponBookTableProps> = ({couponBooks}) => {
    const queryClient = useQueryClient();

    const assignCouponMutation = useMutation({
        mutationFn: assignCoupon,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['couponBooks', 'users']});
        },
        onError: (error: any) => {
            console.error(error);
            toast.error(`Failed to assign coupon: ${error.response.data.message || 'Unknown error'}`);
        },
    });

    return (
        <table className="table-auto w-full border-collapse border border-gray-200 shadow-md">
            <thead>
            <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2 text-left">ID</th>
                <th className="border border-gray-300 p-2 text-left">Name</th>
                <th className="border border-gray-300 p-2 text-left">Description</th>
                <th className="border border-gray-300 p-2 text-left">Max Coupons</th>
                <th className="border border-gray-300 p-2 text-left">Max Coupons per User</th>
                <th className="border border-gray-300 p-2 text-left">Assign Coupon</th>
            </tr>
            </thead>
            <tbody>
            {couponBooks.map((couponBook) => (
                <tr key={couponBook._id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-2">{couponBook._id}</td>
                    <td className="border border-gray-300 p-2">{couponBook.name}</td>
                    <td className="border border-gray-300 p-2">{couponBook.description}</td>
                    <td className="border border-gray-300 p-2">{couponBook.maxCouponAmount}</td>
                    <td className="border border-gray-300 p-2">{couponBook.maxCouponPerUser}</td>
                    <td className="border border-gray-300 p-2">
                        <Formik
                            initialValues={{userId: ''}}
                            onSubmit={(values, {resetForm}) => {
                                assignCouponMutation.mutate({couponBookId: couponBook._id, userId: values.userId});
                                resetForm();
                            }}
                        >
                            <Form className="flex space-x-2 items-center">
                                <Field
                                    name="userId"
                                    placeholder="User ID"
                                    className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring focus:ring-blue-200"
                                />
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
                                >
                                    Assign
                                </button>
                            </Form>
                        </Formik>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default CouponBookTable;
