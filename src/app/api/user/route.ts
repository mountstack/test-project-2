import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/utills/db"; 

export async function GET() { 
    try { 
        const users = await prisma.user.findMany(); 
        const names = users.map(user => ({ value: user.name, label: user.name })); 
        return NextResponse.json({ 
            success: true, 
            names 
        }) 
    } 
    catch (error) { 
        return NextResponse.json({ 
            success: false, 
            error: error.message 
        }) 
    } 
} 

export async function POST(req: NextRequest) { 
    try { 
        const { email } = await req.json(); 
        const user = await prisma.user.findUnique({ where: { email } });
        
        return NextResponse.json({ 
            success: true, 
            user
        }) 
    } 
    catch (error) {
        return NextResponse.json({
            error: error.message, 
            success: false, 
        })
    } 
} 


export async function PATCH(req: NextRequest) { 
    const data = await req.json();
    const { email, phone, city } = data.user;
    let obj = { email, phone, city }; 

    try { 
        await prisma.user.update({where: { email }, data: obj}); 
        
        return NextResponse.json({ 
            success: true, 
            message: "Updated Successfully!" 
        }) 
    } 
    catch (error) { 
        return NextResponse.json({
            message: "Server Error!", 
            success: false, 
            error: error.message
        }) 
    } 
}

