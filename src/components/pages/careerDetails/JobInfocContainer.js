import React from 'react'
import JobInfoSection from './JobInfoSection'

const JobInfocContainer = ({ data }) => {
    const { Responsibilities, Requirements, Qualifications } = data.attributes; // Destructure the relevant fields
    return (
        <>
            <div className="row g-4 g-md-5">
                <JobInfoSection
                    title="Responsibilities & Key Deliverables"
                    list={Responsibilities.map(item => item.title)} // Assuming each item has a 'title' property
                />
                <JobInfoSection
                    title="Requirements"
                    list={Requirements.map(item => item.tile)} // Assuming each item has a 'title' property
                />
                <JobInfoSection
                    title="Qualifications"
                    list={Qualifications.map(item => item.title)} // Assuming each item has a 'title' property
                />
            </div>
        </>
    );
};

export default JobInfocContainer