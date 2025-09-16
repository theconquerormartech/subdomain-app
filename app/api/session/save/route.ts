import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email } = await request.json();
    
    const session = await getSession();
    
    session.firstName = firstName;
    session.lastName = lastName;
    session.email = email;
    
    await session.save();
    
    return NextResponse.json({ 
      success: true, 
      message: "Form data saved successfully" 
    });
  } catch (error) {
    console.error("Error saving session:", error);
    return NextResponse.json(
      { success: false, message: "Failed to save form data" },
      { status: 500 }
    );
  }
}
