import React from 'react';

const RecentPost = ({ post }) => {
    const { title, slug, image } = post.attributes; // Destructure post attributes
    const imageUrl = image?.data?.attributes?.url; // Get image URL

    return (
        <div className="d-flex blog-flex">
            <a href={`/blogs/${slug}`} className="d-flex text-decoration-none"> {/* Link to the blog post */}
                <div className="flex-shrink-0 blog-img">
                    {imageUrl && <img src={process.env.NEXT_PUBLIC_STRAPI_URL + imageUrl} alt={title} />} {/* Render image if available */}
                </div>
                <div className="flex-grow-1 ms-3 blog-post-content">
                    <p>{title}</p> {/* Render the title */}
                </div>
            </a>
        </div>
    );
}

export default RecentPost;