import React from 'react';
import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup';

const UserSchema = Yup.object({
    firstname: Yup.string().required('FirstName is required'),
    lastname: Yup.string().required('LastName is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
});

interface UserFormProps {
    onSubmit: (values: { firstname: string; lastname: string; email: string }) => void;
}

const UserForm: React.FC<UserFormProps> = ({onSubmit}) => (
    <Formik
        initialValues={{firstname: '', lastname: '', email: ''}}
        validationSchema={UserSchema}
        onSubmit={onSubmit}
    >
        {({errors, touched}) => (
            <Form className="space-y-4">
                <div className="space-y-2">
                    <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">Firstname</label>
                    <Field
                        name="firstname"
                        className="block w-full p-2 border border-gray-300 rounded-md"
                    />
                    {errors.firstname && touched.firstname && (
                        <div className="text-xs text-red-500">{errors.firstname}</div>
                    )}
                </div>
                <div className="space-y-2">
                    <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Lastname</label>
                    <Field
                        name="lastname"
                        className="block w-full p-2 border border-gray-300 rounded-md"
                    />
                    {errors.lastname && touched.lastname && (
                        <div className="text-xs text-red-500">{errors.lastname}</div>
                    )}
                </div>
                <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <Field
                        name="email"
                        type="email"
                        className="block w-full p-2 border border-gray-300 rounded-md"
                    />
                    {errors.email && touched.email && (
                        <div className="text-xs text-red-500">{errors.email}</div>
                    )}
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600"
                >
                    Add User
                </button>
            </Form>
        )}
    </Formik>
);

export default UserForm;
