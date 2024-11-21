import React, {useState} from 'react';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {toast} from 'react-toastify';
import {checkCoupon, getUsers, UserCoupon} from "../../api/users.ts";
import {assignCoupon, redeemCoupon} from "../../api/coupon-books.ts";
import ProductDetails from "./ProductDetails.tsx";
import CouponInput from "./CouponInput.tsx";
import PurchaseButton from "./PurchaseButton.tsx";
import UserDropdown from "./UserDropdown.tsx";
import {AxiosError} from "axios";

const ShoppingCart: React.FC = () => {
    const [couponCode, setCouponCode] = useState('');
    const [coupon, setCoupon] = useState<UserCoupon | null>(null);
    const [activeUserId, setActiveUserId] = useState('');
    const [grantNewCoupon, setGrantNewCoupon] = useState(false);

    const queryClient = useQueryClient();

    const fakeProduct = {
        name: 'Headphones',
        price: 189.0,
        imageUrl: 'https://massdrop-s3.imgix.net/product-images/drop-hifiman-he4xx-planar-magnetic-headphones/FP/BwpDhv6uTaG6QL09FIWI_4704x3136_Massdrop_x_HIFIMAN_HE4XX_Planar_Magnetic_Headphones03-newlogo-page-pc.png?auto=format&fm=jpg&fit=fill&w=360&h=360&bg=f0f0f0&fill=solid&fill-color=f0f0f0&dpr=1&q=70', // Placeholder image URL
    };

    const {data: users, isLoading} = useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
    });

    const checkCouponMutation = useMutation({
        mutationFn: checkCoupon,
        onSuccess: (data) => {
            toast.success('Coupon is valid!');
            setCoupon(data);
        },
        onError: (error: AxiosError) => {
            if (error.status === 400) {
                toast.error((error.response as any).data.message);
            } else {
                toast.error(error.message);
            }
            setCoupon(null);
        },
    });

    const redeemCouponMutation = useMutation({
        mutationFn: redeemCoupon,
        onSuccess: () => {
            toast.success('Coupon redeemed successfully!');
            if (grantNewCoupon) {
                assignCouponMutation.mutate({couponBookId: coupon!.couponBookId, userId: activeUserId})
            }
            setCouponCode('');
            setCoupon(null);
        },
        onError: (error: AxiosError) => {
            if (error.status === 400) {
                toast.error((error.response as any).data.message);
            } else {
                toast.error(error.message);
            }
            setCouponCode('');
            setCoupon(null);
        },
    });

    const assignCouponMutation = useMutation({
        mutationFn: assignCoupon,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['couponBooks', 'users']});
        },
        onError: (error: any) => {
            console.error(error);
            toast.info(`Failed to assign coupon: ${error.response.data.message || 'Unknown error'} (In a real implementation this shouldn't be visible`);
        },
    });

    const handleApplyCoupon = () => {
        if (activeUserId && activeUserId !== "") {
            checkCouponMutation.mutate({userId: activeUserId, couponCode});
        } else {
            toast.error('Please input a userId');
        }
    };

    const handleRedeemCoupon = () => {
        if (coupon) {
            redeemCouponMutation.mutate({couponBookId: coupon.couponBookId, userId: activeUserId, couponCode});
        } else {
            toast.error('Please apply a valid coupon first.');
        }
    };

    const isCouponValid = coupon !== null;
    const discount = coupon?.discount || 0;
    const discountedPrice = (fakeProduct.price * (1 - discount / 100)).toFixed(2);

    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-md shadow-md space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Shopping Cart</h2>


            <ProductDetails
                product={fakeProduct}
                discountedPrice={discountedPrice}
                isCouponValid={isCouponValid}
            />

            <UserDropdown
                users={users || []}
                isLoading={isLoading}
                activeUserId={activeUserId}
                setActiveUserId={setActiveUserId}
            />

            <CouponInput
                couponCode={couponCode}
                setCouponCode={setCouponCode}
                handleApplyCoupon={handleApplyCoupon}
            />

            <div className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    id="grantNewCoupon"
                    checked={grantNewCoupon}
                    onChange={(e) => setGrantNewCoupon(e.target.checked)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="grantNewCoupon" className="text-sm text-gray-700">Grant a new coupon to the user upon
                    redeeming</label>
            </div>

            <PurchaseButton
                isCouponValid={isCouponValid}
                handleRedeemCoupon={handleRedeemCoupon}
            />
        </div>
    );
};

export default ShoppingCart;
