"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ROUTES from "@/constant/route.constants";
import { hasPermission } from "@/permissions/component.permission";
import { Resource } from "@/permissions/resource.enum";
import { Action } from "@/permissions/action.enum";
import Loader from "@/components/Loader/Loader";

const PublicRoute = ({
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
    if (isMounted && token) {
      const homeRoute = hasPermission(Resource.USER, Action.READ)
        ? ROUTES.HOME
        : hasPermission(Resource.ARTIST, Action.READ)
        ? ROUTES.ARTIST
        : ROUTES.SONG;

      router.replace(homeRoute);
    }
  }, [isMounted, token, router]);

  // Render children only if the user is not authenticated and the component is mounted
  if (!isMounted || token) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default PublicRoute;
