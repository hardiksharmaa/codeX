import { usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/config/db";
 
 export async function POST(req:NextRequest){
  try {
     const user =await currentUser();
    
    if (!user?.primaryEmailAddress?.emailAddress) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
 
     const users=await db.select().from(usersTable)
       .where(eq(usersTable.email, user.primaryEmailAddress.emailAddress))
 
     if(users.length===0){
         const newUser={
            name: user.fullName || user.firstName || "User",
            email: user.primaryEmailAddress.emailAddress,
             points:0
         }
         const result=await db.insert(usersTable).values(newUser).returning()
         return NextResponse.json(result[0])
     }
 
     return NextResponse.json(users[0])
  } catch (error) {
    console.error("Error in POST /api/user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
 }