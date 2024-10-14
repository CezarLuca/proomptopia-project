"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";
import ProtectedRoute from "@components/ProtectedRoute";

const MyProfile = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(
                `/api/users/${session?.user.id}/posts`
            );
            const data = await response.json();
            setPosts(data);
        };
        // console.log(posts);
        if (session?.user.id) fetchPosts();
    }, []);

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`);
    };
    const handleDelete = async (post) => {
        const hasConfirmed = confirm(
            "Are you sure you want to delete this post?"
        );

        if (!hasConfirmed) return;

        try {
            await fetch(`/api/prompt/${post._id.toString()}`, {
                method: "DELETE",
            });

            const filteredPosts = posts.filter((p) => p._id !== post._id);

            setPosts(filteredPosts);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ProtectedRoute>
            <Profile
                name="My"
                desc="Welcome to your profile page with your prompt selection."
                data={posts}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
        </ProtectedRoute>
    );
};

export default MyProfile;
