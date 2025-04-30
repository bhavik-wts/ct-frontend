'use client'
import React, { useState } from 'react'; // Import useState
import JobApplicationModal from './JobApplicationModal';

const JobTitleContainer = ({ title, createdAt, experienceDetail, city }) => {
    const [showModal, setShowModal] = useState(false); // State to manage modal visibility

    const handleClose = () => setShowModal(false); // Function to close modal
    const handleShow = () => setShowModal(true); // Function to show modal

    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <div className="jd-title">
                        <div className="jd-title-content">
                            <small>Posted on {createdAt}</small>
                            <h3>{title} | Rajkot</h3>
                            <p><img src="/images/suitcase.svg" alt="experience" />
                                {experienceDetail}</p>
                        </div>

                        <button onClick={handleShow}>apply now!</button> {/* Use handleShow to open modal */}
                    </div>
                </div>
            </div>
            <hr />
            <JobApplicationModal show={showModal} handleClose={handleClose} /> {/* Pass props to modal */}
        </>
    );
}

export default JobTitleContainer;