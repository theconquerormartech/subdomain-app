import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email } = await request.json();
    
    // Save to encrypted session (for security)
    const session = await getSession();
    session.firstName = firstName;
    session.lastName = lastName;
    session.email = email;
    await session.save();
    
    // Also save to plain cookie (for fast access)
    const response = NextResponse.json({ 
      success: true, 
      message: "Form data saved successfully" 
    });
    
    response.cookies.set('user-form-data', JSON.stringify({
      firstName,
      lastName,
      email
    }), {
      domain: "reosm.com",
      path: "/",
      httpOnly: false, // Allow JavaScript access
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 // 24 hours
    });
    
    return response;
  } catch (error) {
    console.error("Error saving session:", error);
    return NextResponse.json(
      { success: false, message: "Failed to save form data" },
      { status: 500 }
    );
  }
}
