"use client";
import ROUTES from "@/constant/route.constants";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader/Loader";

const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Clear localStorage and handle redirect
      window.localStorage.clear();
      router.replace(ROUTES.LOGIN);
    }
  }, [router]);

  return <Loader />;
};

export default LogoutPage;
