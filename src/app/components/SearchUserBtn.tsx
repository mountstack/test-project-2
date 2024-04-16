"use client"
import React from 'react'; 
import { redirect } from "next/navigation";
import Link from "next/link"; 

function SearchUserBtn() { 
    return ( 
        <Link href="/search">
            <button 
                className='ml-5 border-2 border-violet-700 rounded-sm py-2 px-5'> 
                Search User 
            </button> 
        </Link>
    ) 
} 

export default SearchUserBtn