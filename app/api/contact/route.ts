import { contactInbox } from "@/lib/contact";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_MESSAGE = 4000;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const data = body as { name?: unknown; email?: unknown; message?: unknown; company?: unknown };
  if (typeof data.company === "string" && data.company.trim()) {
    return NextResponse.json({ ok: true });
  }

  const name = typeof data.name === "string" ? data.name.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim() : "";
  const message = typeof data.message === "string" ? data.message.trim() : "";

  if (name.length < 1 || name.length > 120) {
    return NextResponse.json({ ok: false, error: "name" }, { status: 400 });
  }
  if (!EMAIL.test(email) || email.length > 200) {
    return NextResponse.json({ ok: false, error: "email" }, { status: 400 });
  }
  if (message.length < 2 || message.length > MAX_MESSAGE) {
    return NextResponse.json({ ok: false, error: "message" }, { status: 400 });
  }

  const user = process.env.GMAIL_USER?.trim() || "rgah2107@gmail.com";
  const pass = process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, "");
  if (!pass) {
    return NextResponse.json({ ok: false, error: "send" }, { status: 503 });
  }

  try {
    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user, pass },
    });

    await transport.sendMail({
      from: `"Moscow Diary" <${user}>`,
      to: contactInbox,
      replyTo: email,
      subject: "A letter from the Moscow Diary site",
      text: `From: ${name} <${email}>\n\n${message}`,
    });
  } catch {
    return NextResponse.json({ ok: false, error: "send" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
