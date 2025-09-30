"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { authClient } from "@/lib/auth/auth-client";

interface PhoneVerificationStepProps {
  onVerified: (phoneNumber: string) => void;
}

interface FormData {
  phoneNumber: string;
  otp: string;
  agreeToTerms: boolean;
}

export function PhoneVerificationStep({
  onVerified,
}: PhoneVerificationStepProps) {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const form = useForm<FormData>({
    defaultValues: {
      phoneNumber: "",
      otp: "",
      agreeToTerms: false,
    },
  });

  const phoneNumber = form.watch("phoneNumber");
  const otp = form.watch("otp");
  const agreeToTerms = form.watch("agreeToTerms");

  const startCountdown = () => {
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSendOtp = async () => {
    if (!phoneNumber || phoneNumber.length !== 11) {
      form.setError("phoneNumber", { message: "请输入正确的手机号码" });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await authClient.phoneNumber.sendOtp({
        phoneNumber: `+86${phoneNumber}`,
      });

      if (!error) {
        setIsOtpSent(true);
        startCountdown();
        console.log("OTP sent to:", `+86${phoneNumber}`);
      } else {
        form.setError("phoneNumber", {
          message: error.message || "发送验证码失败",
        });
      }
    } catch (error) {
      form.setError("phoneNumber", { message: "网络错误，请重试" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      form.setError("otp", { message: "请输入6位验证码" });
      return;
    }

    if (!agreeToTerms) {
      form.setError("agreeToTerms", { message: "请同意用户协议和隐私政策" });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await authClient.phoneNumber.verify({
        phoneNumber: `+86${phoneNumber}`,
        code: otp,
      });

      if (!error && data) {
        onVerified(`+86${phoneNumber}`);
      } else {
        form.setError("otp", {
          message: error?.message || "验证码错误，请重试",
        });
      }
    } catch (error) {
      form.setError("otp", { message: "网络错误，请重试" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-900">验证手机号</h3>
        <p className="mt-2 text-sm text-gray-600">我们将向您的手机发送验证码</p>
      </div>

      <Form {...form}>
        <div className="space-y-4">
          {/* Phone Number Input */}
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>手机号码</FormLabel>
                <FormControl>
                  <div className="flex">
                    <div className="flex items-center px-3 py-2 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm rounded-l-md">
                      +86
                    </div>
                    <Input
                      {...field}
                      type="tel"
                      placeholder="请输入手机号码"
                      className="rounded-l-none"
                      maxLength={11}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Send OTP Button */}
          <Button
            type="button"
            onClick={handleSendOtp}
            disabled={
              !phoneNumber ||
              phoneNumber.length !== 11 ||
              isLoading ||
              countdown > 0
            }
            className="w-full"
            variant={isOtpSent ? "outline" : "default"}
          >
            {isLoading
              ? "发送中..."
              : countdown > 0
                ? `重新发送 (${countdown}s)`
                : isOtpSent
                  ? "重新发送验证码"
                  : "发送验证码"}
          </Button>

          {/* OTP Input */}
          {isOtpSent && (
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>验证码</FormLabel>
                  <FormControl>
                    <div className="flex justify-center">
                      <InputOTP
                        maxLength={6}
                        value={field.value}
                        onChange={field.onChange}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Agreement Checkbox */}
          {isOtpSent && (
            <FormField
              control={form.control}
              name="agreeToTerms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm">
                      我已阅读并同意{" "}
                      <a href="#" className="text-blue-600 hover:underline">
                        用户协议
                      </a>{" "}
                      和{" "}
                      <a href="#" className="text-blue-600 hover:underline">
                        隐私政策
                      </a>
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          )}

          {/* Continue Button */}
          {isOtpSent && (
            <Button
              type="button"
              onClick={handleVerifyOtp}
              disabled={!otp || otp.length !== 6 || !agreeToTerms || isLoading}
              className="w-full"
            >
              {isLoading ? "验证中..." : "继续"}
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
}
