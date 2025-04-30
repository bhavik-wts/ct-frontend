import React from 'react'
import Product from '@/components/shared/ProductSlider/Product'


const TwoProducts = ({ name, data, isWhite }) => {
    return (
        <section className={`feature py-80 pb-5 ${isWhite ? "bg-white" : ""}`} id="22hp">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="section-title">
                            <h3>Featured Tractors</h3>
                            <h2>{name}</h2>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <Product data={data[0]} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TwoProducts