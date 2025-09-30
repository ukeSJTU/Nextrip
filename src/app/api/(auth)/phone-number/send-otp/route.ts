import { auth } from "@/lib/auth";
import { NextRequest } from "next/server";

export const GET = async (req: Request) => {
  return Response.json({ message: "Healthy" });
};

export const POST = async (req: NextRequest) => {
  try {
    // 解析请求体
    const body = await req.json();
    const { phoneNumber } = body;

    // 验证手机号码是否存在
    if (!phoneNumber) {
      return Response.json(
        { error: "Phone number is required" },
        { status: 400 }
      );
    }

    // 验证手机号码格式（简单验证）
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return Response.json(
        { error: "Invalid phone number format" },
        { status: 400 }
      );
    }

    // 调用 better-auth 的 API 来发送 OTP
    const result = await auth.api.sendPhoneNumberOTP({
      body: {
        phoneNumber,
      },
      headers: req.headers,
    });

    return Response.json({
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.error("Error sending OTP:", error);

    // 处理 better-auth 的特定错误
    if (error instanceof Error) {
      return Response.json({ error: error.message }, { status: 400 });
    }

    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
};
