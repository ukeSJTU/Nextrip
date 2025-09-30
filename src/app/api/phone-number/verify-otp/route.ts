import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber, otp } = await request.json();

    if (!phoneNumber || !otp) {
      return NextResponse.json(
        { error: "Phone number and OTP are required" },
        { status: 400 }
      );
    }

    // Validate OTP format
    if (otp.length !== 6 || !/^\d{6}$/.test(otp)) {
      return NextResponse.json(
        { error: "请输入6位数字验证码" },
        { status: 400 }
      );
    }

    // For testing purposes, we'll accept any 6-digit OTP
    // In a real implementation, you would:
    // 1. Check the OTP against the one stored in database/cache
    // 2. Verify it hasn't expired
    // 3. Mark it as used to prevent reuse

    console.log("Verifying OTP:", { phoneNumber, otp });

    const data = await auth.api.verifyPhoneNumber({
      body: {
        phoneNumber,
        code: otp,
        disableSession: false,
        updatePhoneNumber: true,
      },
    });

    console.log("Verify phone number response:", data);

    // Simulate OTP verification
    // For demo purposes, we'll accept any OTP that starts with "1"
    if (otp.startsWith("1")) {
      return NextResponse.json(
        {
          success: true,
          message: "验证码验证成功",
          verified: true,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "验证码错误，请重试" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("OTP verification error:", error);
    return NextResponse.json({ error: "验证失败，请重试" }, { status: 500 });
  }
}
