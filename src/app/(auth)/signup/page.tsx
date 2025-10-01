"use client";

import { useMemo, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  // InputOTPSeparator,
} from "@/components/ui/input-otp";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2 } from "lucide-react";

export default function SignupPage() {
  // UI-only state (no real logic yet)
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [regionCode, setRegionCode] = useState<string>("CN +86");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [consent, setConsent] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const steps = [
    { id: 1, title: "验证手机", description: "输入手机号并验证" },
    { id: 2, title: "设置密码", description: "为您的账户设置密码" },
    { id: 3, title: "注册成功", description: "完成注册流程" },
  ];

  const progressValue = useMemo(
    () => (currentStep / steps.length) * 100,
    [currentStep]
  );

  const canProceedFromVerify = useMemo(
    () => phoneNumber.trim().length >= 6 && otp.length === 6 && consent,
    [phoneNumber, otp, consent]
  );

  const canProceedFromPassword = useMemo(
    () => password.length >= 6 && password === confirmPassword,
    [password, confirmPassword]
  );

  const handleSendCode = () => {
    // Placeholder for sending SMS code. Actual logic will be added later.
  };

  const goNextFromVerify = () => {
    if (!canProceedFromVerify) return;
    setCurrentStep(2);
  };

  const goNextFromPassword = () => {
    if (!canProceedFromPassword) return;
    setCurrentStep(3);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-[1020px]">
        <div className="bg-white py-8 px-6 shadow sm:rounded-lg sm:px-10">
          {/* Steps indicator */}
          <div className="mb-8">
            <div className="flex justify-center gap-0">
              {steps.map(step => {
                const isActive = currentStep === step.id;
                const isFirst = step.id === 1;
                return (
                  <div key={step.id} className="flex items-center w-[325.33px]">
                    {/* bar + dot */}
                    <div className="relative mr-[5px] w-full">
                      <div
                        aria-hidden
                        className="h-[5px] w-full bg-[#DDDDDD] rounded-[3px]"
                      ></div>
                      <div
                        aria-hidden
                        className={`absolute -top-[5px] ${isFirst ? "left-0" : "right-0"} h-[15px] w-[15px] rounded-[7.5px] ${
                          isActive ? "bg-[#ACD252]" : "bg-[#DDDDDD]"
                        }`}
                      ></div>
                    </div>
                    <span
                      className={`text-[12px] leading-[18px] font-normal ${
                        isActive ? "text-[#799D08]" : "text-[#9A9A9A]"
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Removed legacy step indicator and progress elements to match Figma design */}
        </div>

        {/* Step content */}
        {currentStep === 1 && (
          <div className="space-y-6">
            {/* Phone number */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gray-700">
                手机号
              </Label>
              <div className="flex gap-3">
                <Select
                  value={regionCode}
                  onValueChange={v => setRegionCode(v)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="选择国家/地区" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CN +86">中国大陆 +86</SelectItem>
                    <SelectItem value="HK +852">中国香港 +852</SelectItem>
                    <SelectItem value="TW +886">中国台湾 +886</SelectItem>
                    <SelectItem value="US +1">美国 +1</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  id="phone"
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
                  placeholder="有效手机号"
                />
              </div>
            </div>

            {/* OTP */}
            <div className="space-y-2">
              <Label className="text-gray-700">短信验证码</Label>
              <div className="flex items-center gap-3">
                <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                  <InputOTPGroup>
                    {[0, 1, 2, 3, 4, 5].map(i => (
                      <InputOTPSlot key={i} index={i} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
                <Button variant="secondary" onClick={handleSendCode}>
                  发送验证码
                </Button>
              </div>
            </div>

            {/* Consent */}
            <div className="flex items-start gap-3 text-sm text-gray-600">
              <Checkbox
                id="consent"
                checked={consent}
                onCheckedChange={v => setConsent(Boolean(v))}
              />
              <Label htmlFor="consent" className="cursor-pointer">
                同意
                <span className="mx-1 text-blue-600 hover:underline">
                  《服务协议》
                </span>
                和
                <span className="mx-1 text-blue-600 hover:underline">
                  《隐私政策》
                </span>
              </Label>
            </div>

            <Separator />

            {/* Primary CTA */}
            <div className="flex justify-end">
              <Button
                onClick={goNextFromVerify}
                disabled={!canProceedFromVerify}
              >
                下一步，设置密码
              </Button>
            </div>

            {/* Secondary link */}
            <div className="text-right">
              <a href="#" className="text-blue-600 text-sm hover:underline">
                企业客户注册
              </a>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="password">设置密码</Label>
              <Input
                id="password"
                type="password"
                placeholder="至少 6 位，包含字母与数字"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              {/* simple strength indicator */}
              <div className="mt-2">
                <Progress
                  value={Math.min(password.length * 10, 100)}
                  className="h-1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm">确认密码</Label>
              <Input
                id="confirm"
                type="password"
                placeholder="再次输入密码"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
            </div>

            <Separator />

            <div className="flex justify-between">
              <Button variant="secondary" onClick={() => setCurrentStep(1)}>
                返回手机验证
              </Button>
              <Button
                onClick={goNextFromPassword}
                disabled={!canProceedFromPassword}
              >
                完成注册
              </Button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
              <h2 className="text-lg font-semibold">注册成功</h2>
              <p className="text-sm text-gray-600">
                您的手机号 {regionCode} {phoneNumber} 已完成注册
              </p>
            </div>

            <Separator />

            <div className="flex justify-center gap-3">
              <Button variant="secondary" onClick={() => setCurrentStep(1)}>
                重新注册
              </Button>
              <Button
                onClick={() => {
                  /* placeholder redirect */
                }}
              >
                开始使用
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
