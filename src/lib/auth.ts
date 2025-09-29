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
      sendOTP: ({ phoneNumber, code }, request) => {
        // TODO: Implement sending OTP code via SMS
        console.log(`Sending OTP code ${code} to ${phoneNumber}`);
      },
    }),
  ],
});
