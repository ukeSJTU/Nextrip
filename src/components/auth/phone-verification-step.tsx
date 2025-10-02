"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { UseFormReturn } from "react-hook-form";
import { authClient } from "@/lib/auth/auth-client";

export interface PhoneVerificationForm {
  regionCode: string;
  phoneNumber: string;
  otp: string;
  consent: boolean;
}

interface PhoneVerificationStepProps {
  form: UseFormReturn<PhoneVerificationForm>;
  onSubmit: (data: PhoneVerificationForm) => void;
  onSendCode: () => void;
}

const regionCodes = [
  { value: "+86", label: "+86 中国" },
  { value: "+1", label: "+1 美国/加拿大" },
  { value: "+44", label: "+44 英国" },
  { value: "+81", label: "+81 日本" },
  { value: "+82", label: "+82 韩国" },
  { value: "+65", label: "+65 新加坡" },
  { value: "+852", label: "+852 香港" },
  { value: "+853", label: "+853 澳门" },
  { value: "+886", label: "+886 台湾" },
];

export function PhoneVerificationStep({
  form,
  onSubmit,
  onSendCode,
}: PhoneVerificationStepProps) {
  const [hasSentOTP, setHasSentOTP] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [phoneError, setPhoneError] = useState("");
  const [otpSuccess, setOtpSuccess] = useState("");
  const [lastVerifiedPhone, setLastVerifiedPhone] = useState("");

  // 倒计时逻辑
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleSendCode = () => {
    const regionCode = form.getValues("regionCode");
    const phoneNumber = form.getValues("phoneNumber");

    // 清除之前的错误信息
    setPhoneError("");
    setOtpSuccess("");

    // 验证手机号是否为空
    if (!phoneNumber || phoneNumber.trim() === "") {
      setPhoneError("请输入手机号");
      return;
    }

    // 基本格式验证
    const phoneRegex = /^\d{7,15}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setPhoneError("手机号格式不正确，请重新输入");
      return;
    }

    // 发送验证码成功
    setOtpSuccess("验证码已发送至您的手机，请注意查收!");
    setHasSentOTP(true);
    setCountdown(60);
    setLastVerifiedPhone(regionCode + phoneNumber);
    onSendCode();
  };

  const handleFormSubmit = (data: PhoneVerificationForm) => {
    const currentPhone = data.regionCode + data.phoneNumber;

    // 检查验证码错误逻辑
    if (currentPhone !== lastVerifiedPhone && hasSentOTP) {
      form.setError("otp", {
        type: "manual",
        message: "验证码错误，请重新输入或重新发送(20011)",
      });
      return;
    }

    // 这里可以添加验证码验证逻辑
    // 如果验证码错误，显示20010错误
    // form.setError("otp", {
    //   type: "manual",
    //   message: "验证码不正确(20010)"
    // });

    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="space-y-6"
      >
        {/* Phone number */}
        <div className="flex items-start gap-4">
          <FormLabel className="text-gray-700 min-w-[80px] pt-2">
            手机号
          </FormLabel>
          <div className="flex-1 space-y-2">
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="regionCode"
                render={({ field }) => (
                  <FormItem className="w-32">
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="选择区号" />
                        </SelectTrigger>
                        <SelectContent>
                          {regionCodes.map(region => (
                            <SelectItem key={region.value} value={region.value}>
                              {region.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="请输入手机号"
                        onChange={e => {
                          field.onChange(e);
                          setPhoneError("");
                          setOtpSuccess("");
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {phoneError && <p className="text-sm text-red-500">{phoneError}</p>}
          </div>
        </div>

        {/* OTP */}
        <div className="flex items-start gap-4">
          <FormLabel className="text-gray-700 min-w-[80px] pt-2">
            短信验证码
          </FormLabel>
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-3">
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputOTP
                        maxLength={6}
                        value={field.value}
                        onChange={field.onChange}
                      >
                        <InputOTPGroup>
                          {[0, 1, 2, 3, 4, 5].map(i => (
                            <InputOTPSlot key={i} index={i} />
                          ))}
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="secondary"
                onClick={handleSendCode}
                disabled={countdown > 0}
              >
                {countdown > 0
                  ? `${countdown}s`
                  : hasSentOTP
                    ? "重发验证码"
                    : "发送验证码"}
              </Button>
            </div>
            {otpSuccess && (
              <p className="text-sm text-green-600">{otpSuccess}</p>
            )}
          </div>
        </div>

        {/* Consent */}
        <FormField
          control={form.control}
          name="consent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-sm text-gray-600 cursor-pointer">
                  同意
                  <span className="mx-1 text-blue-600 hover:underline">
                    《服务协议》
                  </span>
                  和
                  <span className="mx-1 text-blue-600 hover:underline">
                    《隐私政策》
                  </span>
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <Separator />

        {/* Primary CTA */}
        <div className="flex justify-end">
          <Button type="submit">下一步，设置密码</Button>
        </div>

        {/* Secondary link */}
        <div className="text-right">
          <a
            href="/corporate"
            className="text-blue-600 text-sm hover:underline"
          >
            企业客户注册
          </a>
        </div>
      </form>
    </Form>
  );
}
