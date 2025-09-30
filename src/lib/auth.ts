import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/lib/db";
import { phoneNumber } from "better-auth/plugins";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: drizzleAdapter(db, {
    provider: "pg",
  }),

  plugins: [
    phoneNumber({
      sendOTP: async ({ phoneNumber, code }, request) => {
        // TODO: 集成实际的 SMS 服务提供商（如 Twilio, AWS SNS 等）
        // 目前仅记录日志用于开发测试
        console.log(`Sending OTP code ${code} to ${phoneNumber}`);

        // 在生产环境中，这里应该调用实际的 SMS 服务
        // 例如：
        // await twilioClient.messages.create({
        //   body: `Your verification code is: ${code}`,
        //   from: process.env.TWILIO_PHONE_NUMBER,
        //   to: phoneNumber
        // });

        // 模拟发送成功
        return Promise.resolve();
      },
    }),
  ],
});
