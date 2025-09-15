import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const { email, password } = body;

  const validEmail = process.env.ADMIN_EMAIL;
  const validPassword = process.env.ADMIN_PASSWORD;

  if (email === validEmail && password === validPassword) {
    const res = NextResponse.json({ success: true });
    res.cookies.set("admin-auth", "true", {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 12, // 12 hours
    });
    return res;
  }

  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
