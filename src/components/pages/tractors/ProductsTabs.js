import React from 'react'

const ProductsTabs = ({ setTractorType }) => {
    return (
        <div className='listing-tabs'>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" onClick={() => setTractorType("Domestic")} id="home-tab" data-bs-toggle="tab"
                                    data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane"
                                    aria-selected="true">Domestic</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="profile-tab" onClick={() => setTractorType("International")} data-bs-toggle="tab"
                                    data-bs-target="#profile-tab-pane" type="button" role="tab"
                                    aria-controls="profile-tab-pane" aria-selected="false"
                                    tabIndex="-1">Exports/International</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductsTabs