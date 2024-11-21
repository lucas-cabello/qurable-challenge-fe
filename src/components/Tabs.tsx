import React from 'react';

interface TabsProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({activeTab, setActiveTab}) => {
    return (
        <div className="flex space-x-4 mb-6 border-b border-gray-200">
            <button
                onClick={() => setActiveTab('users')}
                className={`py-2 px-4 ${
                    activeTab === 'users'
                        ? 'border-b-2 border-blue-500 text-blue-500 font-semibold'
                        : 'text-gray-600 hover:text-blue-500'
                }`}
            >
                Users
            </button>
            <button
                onClick={() => setActiveTab('couponBooks')}
                className={`py-2 px-4 ${
                    activeTab === 'couponBooks'
                        ? 'border-b-2 border-blue-500 text-blue-500 font-semibold'
                        : 'text-gray-600 hover:text-blue-500'
                }`}
            >
                Coupon Books
            </button>
            <button
                onClick={() => setActiveTab('shoppingCart')}
                className={`py-2 px-4 ${
                    activeTab === 'shoppingCart'
                        ? 'border-b-2 border-blue-500 text-blue-500 font-semibold'
                        : 'text-gray-600 hover:text-blue-500'
                }`}
            >
                Shopping Cart
            </button>
        </div>
    );
};

export default Tabs;
