import React from 'react'
import Product from "./Product";
import Implement from "./Implement";

const ProductSlides = () => {
    return (

        <>
            {
                type === 'product' ? <Product key={index} item={item} />
                    : <Implement key={index} item={item} />

            }

        </>
    )
}

export default ProductSlides