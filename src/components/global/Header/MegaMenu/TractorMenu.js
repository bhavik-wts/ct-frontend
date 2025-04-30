import React, { useContext, useEffect, useState } from 'react'
import CommonMainComponent from './components/CommonMainComponent'
import OtherProcuctsContainer from './components/OtherProcuctsContainer'
import Tabs from './components/Tabs'
import MenuContext from "./MenuContext";
const TractorMenu = () => {
    const menuData = useContext(MenuContext);
    // console.log("menuData", menuData.tractorCategorywiseData);
    const allCategories = menuData.tractorCategorywiseData.data.map((category) => category.attributes.name);
    const [selectedCategory, setSelectedCategory] = useState(allCategories[0]);
    const [selectedTractor, setSelectedTractor] = useState(null); // State for the selected tractor
    const [allTractors, setAllTractors] = useState([]); // State for the selected tractor



    const handleTractorSelect = (tractor) => {
        setSelectedTractor(tractor); // Update the selected tractor
    };


    useEffect(() => {
        const filteredCategory = menuData.tractorCategorywiseData.data.filter((category) => category.attributes.name === selectedCategory)[0];
        const tractors = filteredCategory ? filteredCategory.attributes.tractors : [];
        setAllTractors(tractors.data)
        setSelectedTractor(tractors.data[0]);
        // console.log("all", tractors);
        // console.log("tractors.data[0]", tractors.data[0]);
    }, [selectedCategory])


    return (
        <>
            <div className="tractor-menu">
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
                                {selectedTractor && <CommonMainComponent data={selectedTractor} type={"tractor"} />}


                                <OtherProcuctsContainer
                                    type={"tractor"}
                                    allItems={allTractors}
                                    selectedItem={selectedTractor}
                                    onSelect={handleTractorSelect} // Pass select handler
                                />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TractorMenu