import React from 'react';

interface ProductDetailsProps {
    product: {
        name: string;
        price: number;
        imageUrl: string;
    };
    discountedPrice: string;
    isCouponValid: boolean;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
                                                           product,
                                                           discountedPrice,
                                                           isCouponValid,
                                                       }) => {
    return (
        <div className="flex space-x-4 items-center">
            <img
                src={product.imageUrl}
                alt={product.name}
                className="w-20 h-20 object-cover rounded-md border border-gray-300"
            />
            <div>
                <h3 className="text-lg font-medium text-gray-700">{product.name}</h3>
                <p className="text-gray-600">Price: ${product.price.toFixed(2)}</p>
                {isCouponValid && (
                    <p className="text-green-600">
                        Discounted Price: ${discountedPrice}
                    </p>
                )}
            </div>
        </div>
    );
};

export default ProductDetails;
