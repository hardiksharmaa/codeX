"use client";
import React, { useEffect , useState} from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { set } from "date-fns";
import { UserDetailContext } from "../context/UserDetailContext";

export function Provider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const {user}=useUser();
  const [userDetail, setUserDetail]=useState();

  useEffect(()=>{
    user && CreateNewUser();
  },[user])

  const CreateNewUser=async ()=>{
    const result=await axios.post('/api/user', {});
    console.log(result);
    setUserDetail(result?.data);
  }
  return( 
  <NextThemesProvider {...props}>
    <UserDetailContext.Provider value={{userDetail, setUserDetail}}>
      {children}
    </UserDetailContext.Provider>
  </NextThemesProvider>
  )
}
