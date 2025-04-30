import React from 'react'
import ProductCard from './ProductCard'

const OtherProcuctsContainer = ({ allItems, selectedItem, onSelect, type }) => {
    return (
        <div className="col-md-4">
            <div className="tractor-thumb-wrapper">
                {allItems && allItems.length > 0 && allItems.map((item, index) => (
                    <React.Fragment key={index} >
                        <ProductCard data={item} onSelect={onSelect} selectedItem={selectedItem} type={type} />
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}

export default OtherProcuctsContainer