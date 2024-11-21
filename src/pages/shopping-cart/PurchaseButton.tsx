import React from 'react';

interface PurchaseButtonProps {
    isCouponValid: boolean;
    handleRedeemCoupon: () => void;
}

const PurchaseButton: React.FC<PurchaseButtonProps> = ({
                                                           isCouponValid,
                                                           handleRedeemCoupon,
                                                       }) => {
    return (
        <button
            className={`w-full px-4 py-2 rounded-md text-white ${
                isCouponValid
                    ? 'bg-green-500 hover:bg-green-600'
                    : 'bg-gray-400 cursor-not-allowed'
            }`}
            onClick={handleRedeemCoupon}
            disabled={!isCouponValid}
        >
            Make Purchase
        </button>
    );
};

export default PurchaseButton;
