"use client"
import React from 'react';
import { signIn } from "next-auth/react"; 

const Loginpage = async () => { 
    return ( 
        <div className='h-[100vh] w-full flex justify-center items-center'> 
            <button 
                onClick={() => signIn("google", { 
                        callbackUrl: `${window.location.origin}`, 
                    }) 
                } 
                className='border-2 border-slate-600 py-4 px-[100px] rounded-lg font-bold text-3xl text-red-400 bg-red-50'> 
                Login with Google 
            </button> 
        </div> 
    ) 
} 

export default Loginpage; 