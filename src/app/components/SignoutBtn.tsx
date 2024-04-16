"use client"
import React from 'react'
import { signOut } from "next-auth/react";

const SignoutBtn = () => {
    return (
        <button
            onClick={() => signOut({
                callbackUrl: `${window.location.origin}/auth`,
            })}
            className="bg-red-600 text-white rounded-sm py-2 px-6 my-7"
        >
            Logout
        </button>
    )
}

export default SignoutBtn