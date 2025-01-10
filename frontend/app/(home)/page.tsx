"use client";
import Loader from "@/components/Loader/Loader";
import UserTable from "@/components/UserTable";
import ROUTES from "@/constant/route.constants";
import { Action } from "@/permissions/action.enum";
import { hasPermission } from "@/permissions/component.permission";
import { Resource } from "@/permissions/resource.enum";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col justify-center items-center gap-8 ">
      {hasPermission(Resource.USER, Action.CREATE) && (
        <Button
          size="small"
          color="secondary"
          variant="outlined"
          onClick={() => {
            router.push(ROUTES.ADD_USER);
          }}
        >
          Add User
        </Button>
      )}

      <UserTable />
    </div>
  );
};

export default Dashboard;
