import React from 'react';
import UserManagement from '../pages/users/UserManagemet.tsx';
import CouponBookManagement from '../pages/coupon-books/CouponBookManagement';
import ShoppingCart from "../pages/shopping-cart/ShoppingCart.tsx";

interface TabContentProps {
    activeTab: string;
}

const TabContent: React.FC<TabContentProps> = ({activeTab}) => {
    return (
        <div>
            {activeTab === 'users' && <UserManagement/>}
            {activeTab === 'couponBooks' && <CouponBookManagement/>}
            {activeTab === 'shoppingCart' && <ShoppingCart/>}
        </div>
    );
};

export default TabContent;
