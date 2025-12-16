"use client";
import React, { useEffect, useState, useRef } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { UserDetailContext } from "../context/UserDetailContext";
import { Header } from "./_components/Header";
export function Provider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const { user } = useUser();
  const [userDetail, setUserDetail] = useState<any>(null);
  const hasCreatedUser = useRef(false);

  useEffect(() => {
    if (!user?.id || hasCreatedUser.current) return;

    hasCreatedUser.current = true;
    CreateNewUser();
  }, [user?.id]);

  const CreateNewUser = async () => {
    try {
      const result = await axios.post("/api/user");
      setUserDetail(result.data);
    } catch (error) {
      console.error("Failed to create/fetch user", error);
    }
  };

  return (
    <NextThemesProvider {...props}>
      <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
        <div className="flex flex-col items-center">
          <Header />
        </div>
        {children}
      </UserDetailContext.Provider>
    </NextThemesProvider>
  );
}