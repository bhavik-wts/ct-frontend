"use client";
import React, { useEffect, useState } from "react";
import RecentPost from "./RecentPost";
import { fetchData } from "@/lib/graphql-operations";
import { GET_RECENT_BLOGS } from "@/graphql/queries/getRecentBlogs";

const RecentPostContainer = () => {
  const [posts, setPosts] = useState([]); // State to hold posts
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const getRecentBlogs = async () => {
      try {
        const data = await fetchData(GET_RECENT_BLOGS); // Fetch recent blogs
        setPosts(data.blog.data); // Set posts state
      } catch (err) {
        setError(err); // Set error state
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    getRecentBlogs(); // Call the function to fetch blogs
  }, []); // Empty dependency array to run once on mount

  if (loading) return <p>Loading...</p>; // Loading state
  if (error) return <p>Error: {error.message}</p>; // Error state

  return (
    <>
      <div className="sticky-blog-list">
        <h6>Recent Blogs</h6>
        <hr />
        <div className="blog-list-block">
          {posts.map((post) => (
            <RecentPost key={post.id} post={post} /> // Pass each post to RecentPost
          ))}
        </div>
      </div>
    </>
  );
};

export default RecentPostContainer;
