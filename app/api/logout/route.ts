import dbconnect from "@/config/DBConnection";
import { ApiResponse } from "@/types/apiResponse";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
    const res = NextResponse.json({ success: true, message: "Successfully logged out" }, { status: 200 });
    res.cookies.unset("OutSiteJwt", { path: '/' });
    return res;
}