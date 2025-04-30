import React from 'react'
import SupplierForm from './SupplierForm'

export const SupplierSection = ({ title, heading, description }) => {
    return (

        <>
            <section className="supplier py-80">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-11">
                            <div className="section-title text-center">
                                <h3>{title}</h3>
                                <h2>{heading}</h2>
                                <p>{description}</p>
                            </div>
                        </div>
                    </div>
                    <SupplierForm />
                </div>
            </section>

        </>
    )
}
