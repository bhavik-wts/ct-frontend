import React, { useContext, useEffect, useState } from 'react'
import TractorMain from './components/CommonMainComponent'
import OtherProcuctsContainer from './components/OtherProcuctsContainer'
import Tabs from './components/Tabs'
import MenuContext from "./MenuContext";

const ImplementMenu = () => {
    const menuData = useContext(MenuContext);
    const allCategories = menuData.implementCategorywiseData.data.map((category) => category.attributes.name);
    const [selectedCategory, setSelectedCategory] = useState(allCategories[0]);
    const [selectedImplement, setSelectedImplement] = useState(null); // State for the selected tractor
    const [allImplements, setAllImplements] = useState([]); // State for the selected tractor



    const handleImplementSelect = (tractor) => {
        setSelectedImplement(tractor); // Update the selected tractor
    };


    useEffect(() => {
        const filteredCategory = menuData.implementCategorywiseData.data.filter((category) => category.attributes.name === selectedCategory)[0];
        const tractorImplements = filteredCategory ? filteredCategory.attributes.implements : [];
        setAllImplements(tractorImplements.data)
        setSelectedImplement(tractorImplements.data[0]);
        // console.log("all", tractorImplements);
        // console.log("tractors.data[0]", tractors.data[0]);
    }, [selectedCategory])
    return (
        <>
            <div className="implement-menu">
                <div className="tractor-tabs">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        {allCategories.map((category, index) => (
                            <Tabs name={category} key={index} isSelected={selectedCategory === category} setSeletion={setSelectedCategory} />
                        ))}
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel"
                            aria-labelledby="home-tab" tabIndex="0">
                            <div className="row g-5">
                                {selectedImplement && <TractorMain data={selectedImplement} type={"implements"} />}
                                <OtherProcuctsContainer
                                    type={"implements"}
                                    allItems={allImplements}
                                    selectedItem={selectedImplement}
                                    onSelect={handleImplementSelect} // Pass select handler
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>)
}

export default ImplementMenu