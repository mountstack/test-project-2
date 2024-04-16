import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/utills/db"; 

export async function POST(req: NextRequest) { 
    const {name} = await req.json(); 
    try { 
        const user = await prisma.user.findFirst({where: {name}}); 
        console.log(user);
        
        return NextResponse.json({ 
            success: true, 
            user 
        }) 
    } 
    catch (error) { 
        return NextResponse.json({ 
            success: false, 
            error: error.message 
        }) 
    } 
} 