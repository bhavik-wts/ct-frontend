import React from 'react'

const Tabs = ({ name, isSelected, setSeletion }) => {
    return (

        <>
            <li className="nav-item" role="presentation" onClick={() => setSeletion(name)}>
                <button className={`nav-link ${isSelected ? "active" : ""}`} id="home-tab" data-bs-toggle="tab"
                    data-bs-target="#home-tab-pane" type="button" role="tab"
                    aria-controls="home-tab-pane" aria-selected="true">{name}</button>
            </li>

        </>
    )
}

export default Tabs