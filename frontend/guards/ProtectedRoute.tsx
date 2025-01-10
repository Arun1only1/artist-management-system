"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ROUTES from "@/constant/route.constants";
import Loader from "@/components/Loader/Loader";

const ProtectedRoute = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [isMounted, setIsMounted] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);

      try {
        const userSession = localStorage.getItem("userSession");
        const parsedSession = userSession ? JSON.parse(userSession) : null;
        setToken(parsedSession?.accessToken || null);
      } catch (error) {
        console.error("Failed to parse user session:", error);
        setToken(null);
      }
    }
  }, []);

  useEffect(() => {
    if (isMounted && !token) {
      router.replace(ROUTES.LOGOUT);
    }
  }, [isMounted, token, router]);

  if (!isMounted || !token) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
