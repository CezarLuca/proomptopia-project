"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
    return (
        <div className="mt-16 prompt_layout">
            {data.map((post) => (
                <PromptCard
                    key={post._id}
                    post={post}
                    handleTagClick={handleTagClick}
                />
            ))}
        </div>
    );
};

const Feed = () => {
    const [searchText, setSearchText] = useState("");
    const [posts, setPosts] = useState([]);
    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    useEffect(() => {
        const fetchPosts = async () => {
            // const response = await fetch("/api/prompt");
            const response = await fetch(
                `/api/prompt?timestamp=${new Date().getTime()}`
            );

            const data = await response.json();

            setPosts(data);
        };

        fetchPosts();
    }, []);
    return (
        <section className="feed">
            <form className="relative w-full fleax-center">
                <input
                    type="text"
                    placeholder="Search for a tag or username"
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                    className="search_input peer"
                />
            </form>
            <PromptCardList data={posts} handleTagClick={() => {}} />
        </section>
    );
};

export default Feed;
