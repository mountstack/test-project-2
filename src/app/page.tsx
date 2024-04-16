import { getServerSession } from "next-auth";
import { authOptions } from "./utills/auth"; 
import { redirect } from "next/navigation";
import SignoutBtn from "./components/SignoutBtn";
import Form from "./components/Form";
import SearchUserBtn from "./components/SearchUserBtn";
import type { NextAuthOptions } from "next-auth";

export default async function Home() { 
  const session = await getServerSession(authOptions as NextAuthOptions); 
  
  if(!session) { 
    redirect("/auth"); 
  } 

  const name = session?.user?.name; 
  const email = session?.user?.email; 

  return ( 
    <main className="flex min-h-screen flex-col items-center ">
      <div>
        <SignoutBtn /> 
        <SearchUserBtn /> 
      </div>
      
      <div className=""> 
        <Form name={name} email={email} /> 
      </div> 
    </main> 
  ); 
} 
