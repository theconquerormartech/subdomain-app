import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export async function GET() {
  try {
    const session = await getSession();
    
    return NextResponse.json({ 
      success: true, 
      data: {
        firstName: session.firstName || "",
        lastName: session.lastName || "",
        email: session.email || "",
      }
    });
  } catch (error) {
    console.error("Error getting session:", error);
    return NextResponse.json(
      { success: false, message: "Failed to get form data" },
      { status: 500 }
    );
  }
}
