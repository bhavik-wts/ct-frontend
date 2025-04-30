import React from 'react'
import JobTitleContainer from './JobTitleContainer'
import JobInfocContainer from './JobInfocContainer'

// Function to format the date
const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

const JobDetailsContainer = ({ data }) => {
    const { title, createdAt, experienceDetail, city } = data.attributes; // Destructure title, createdAt, and experienceDetail

    return (
        <section className="job-details py-80">
            <div className="container">
                <JobTitleContainer
                    title={title}
                    createdAt={formatDate(createdAt)}
                    city={city}
                    experienceDetail={experienceDetail} // Pass experienceDetail
                />
                <JobInfocContainer data={data} />
            </div>
        </section>
    );
}

export default JobDetailsContainer