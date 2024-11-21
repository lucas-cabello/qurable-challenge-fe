import api from './index';

export interface User {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    coupons: UserCoupon[];
}

export interface UserCoupon {
    code: string;
    discount: number;
    used: boolean;
    couponBookId: string;
}

type CreateUser = Omit<User, "coupons" | "_id">;

export const getUsers = () => api.get<User[]>('/user').then((res) => res.data);

export const createUser = (data: CreateUser) =>
    api.post('/user', data).then((res) => res.data);

interface CheckCouponArgs {
    couponCode: string;
    userId: string;
}

export const checkCoupon = (data: CheckCouponArgs) => api.get<UserCoupon>(`/user/${data.userId}/coupon/${data.couponCode}`).then((res) => res.data);