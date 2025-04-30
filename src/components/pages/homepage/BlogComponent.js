import React from 'react';
import parse from 'html-react-parser'; // Import html-react-parser
import Link from 'next/link';

const BlogComponent = ({ data }) => {
    const { title, slug, image, publishedAt, content } = data.attributes;
    const imageUrl = process.env.NEXT_PUBLIC_STRAPI_URL + image.data.attributes.url; // Assuming you have a base URL for images

    return (
        <div className="blog-wrapper">
            <div className="blog-image">
                <img src={imageUrl} alt={title} />
            </div>
            <div className="blog-content">
                <h3>{title}</h3>
                <div>{parse(content)}</div>
                <Link href={`/blogs/${slug}`}>Read More</Link>
            </div>
        </div>
    );
}

export default BlogComponent;