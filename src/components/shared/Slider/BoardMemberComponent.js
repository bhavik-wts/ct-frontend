import React from 'react'

const BoardMemberComponent = ({ data }) => {
    const name = data.Name;
    const designation = data.Designation;
    const url = data.Image.data.attributes.url
    return (
        <div className="board-member-block">
            <img src={process.env.NEXT_PUBLIC_STRAPI_URL + url} alt="member" />
            <h6>{name}</h6>
            <p>{designation}</p>
        </div>
    )
}

export default BoardMemberComponent