import React from 'react';

interface CouponInputProps {
    couponCode: string;
    setCouponCode: (code: string) => void;
    handleApplyCoupon: () => void;
}

const CouponInput: React.FC<CouponInputProps> = ({
                                                     couponCode,
                                                     setCouponCode,
                                                     handleApplyCoupon,
                                                 }) => {
    return (
        <div className="flex flex-col space-y-2">
            <label className="font-medium text-gray-700">Coupon Code</label>
            <input
                type="text"
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-200"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
            />
            <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                onClick={handleApplyCoupon}
            >
                Apply Coupon
            </button>
        </div>
    );
};

export default CouponInput;
