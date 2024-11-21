import api from './index';

export interface CouponBook {
    _id: string;
    name: string;
    description: string;
    maxCouponAmount: number;
    maxCouponPerUser: number;
    coupons: Coupon[];
}

export interface Coupon {
    code: string;
    discount: number;
    used: boolean;
    userId: string;
}

type CreateCouponBook = Omit<CouponBook, "coupons" | "_id">;

interface AssignCouponArgs {
    couponBookId: string,
    userId: string
}

interface RedeemCouponArgs {
    couponBookId: string,
    userId: string,
    couponCode: string,
}

export const getCouponBooks = () =>
    api.get<CouponBook[]>('/coupon-book').then((res) => res.data);

export const createCouponBook = (data: CreateCouponBook) => api.post('/coupon-book', data).then((res) => res.data);

export const assignCoupon = (data: AssignCouponArgs) =>
    api
        .post(`/coupon-book/${data.couponBookId}/assign`, {userId: data.userId})
        .then((res) => res.data);

export const redeemCoupon = (data: RedeemCouponArgs) => api.post(`/coupon-book/${data.couponBookId}/redeem`, {
    userId: data.userId,
    couponCode: data.couponCode
}).then((res) => res.data);
