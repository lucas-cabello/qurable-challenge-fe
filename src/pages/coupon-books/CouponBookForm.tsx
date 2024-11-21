import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

interface CouponBookFormProps {
    onSubmit: (values: { name: string; description: string; maxCouponAmount: number; maxCouponPerUser: number }) => void;
}

const CouponBookSchema = Yup.object({
    name: Yup.string().max(50, 'Name must be at most 50 characters').required('Name is required'),
    description: Yup.string().max(100, 'Description must be at most 100 characters').required('Description is required'),
    maxCouponAmount: Yup.number().positive().integer().required('Max coupon amount is required'),
    maxCouponPerUser: Yup.number().positive().integer().required('Max coupon per user is required'),
});

const CouponBookForm: React.FC<CouponBookFormProps> = ({ onSubmit }) => {
    return (
        <Formik
            initialValues={{
                name: '',
                description: '',
                maxCouponAmount: 0,
                maxCouponPerUser: 0,
            }}
            validationSchema={CouponBookSchema}
            onSubmit={(values, { resetForm }) => {
                onSubmit(values);
                resetForm();
            }}
        >
            {({ errors, touched }) => (
                <Form className="space-y-4">
                    <div>
                        <label className="block font-medium text-gray-700">Name</label>
                        <Field
                            name="name"
                            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        />
                        {errors.name && touched.name && <div className="text-red-600 text-sm mt-1">{errors.name}</div>}
                    </div>
                    <div>
                        <label className="block font-medium text-gray-700">Description</label>
                        <Field
                            name="description"
                            as="textarea"
                            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        />
                        {errors.description && touched.description && <div className="text-red-600 text-sm mt-1">{errors.description}</div>}
                    </div>
                    <div>
                        <label className="block font-medium text-gray-700">Max Coupon Amount</label>
                        <Field
                            name="maxCouponAmount"
                            type="number"
                            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        />
                        {errors.maxCouponAmount && touched.maxCouponAmount && (
                            <div className="text-red-600 text-sm mt-1">{errors.maxCouponAmount}</div>
                        )}
                    </div>
                    <div>
                        <label className="block font-medium text-gray-700">Max Coupon Per User</label>
                        <Field
                            name="maxCouponPerUser"
                            type="number"
                            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        />
                        {errors.maxCouponPerUser && touched.maxCouponPerUser && (
                            <div className="text-red-600 text-sm mt-1">{errors.maxCouponPerUser}</div>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
                    >
                        Create Coupon Book
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default CouponBookForm;
