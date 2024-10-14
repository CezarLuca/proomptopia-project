"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "loading") return; // Do nothing while loading
        if (!session) router.push("/"); // Redirect if not authenticated
    }, [session, status, router]);

    if (status === "loading" || !session) {
        return <div>Loading...</div>; // Show a loading state while checking authentication
    }

    return children;
};

export default ProtectedRoute;
