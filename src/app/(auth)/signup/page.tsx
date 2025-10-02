"use client";

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";
import {
  PhoneVerificationStep,
  PasswordSetupStep,
  RegistrationSuccessStep,
  PhoneVerificationForm,
  PasswordSetupForm,
} from "@/components/auth";

const phoneVerificationSchema = z.object({
  regionCode: z.string().min(1, "请选择国家/地区"),
  phoneNumber: z.string().min(1, "请输入手机号"),
  otp: z.string().length(6, "验证码必须为6位数字"),
  consent: z.boolean().refine(val => val === true, {
    message: "请同意服务协议和隐私政策",
  }),
});

const passwordSetupSchema = z
  .object({
    password: z.string().min(6, "密码至少需要6位字符"),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "两次输入的密码不一致",
    path: ["confirmPassword"],
  });

export default function SignupPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const phoneForm = useForm<PhoneVerificationForm>({
    resolver: zodResolver(phoneVerificationSchema),
    defaultValues: {
      regionCode: "+86",
      phoneNumber: "",
      otp: "",
      consent: false,
    },
  });

  const passwordForm = useForm<PasswordSetupForm>({
    resolver: zodResolver(passwordSetupSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const progressValue = useMemo(() => {
    return (currentStep / 3) * 100;
  }, [currentStep]);

  const handleSendCode = () => {
    console.log("Sending verification code...");
  };

  const onPhoneVerificationSubmit = (data: PhoneVerificationForm) => {
    console.log("Phone verification data:", data);
    setCurrentStep(2);
  };

  const onPasswordSetupSubmit = (data: PasswordSetupForm) => {
    console.log("Password setup data:", data);
    setCurrentStep(3);
  };

  const handleBackToPhoneVerification = () => {
    setCurrentStep(1);
  };

  const handleRestart = () => {
    setCurrentStep(1);
    phoneForm.reset();
    passwordForm.reset();
  };

  const handleContinue = () => {
    console.log("Continue to app...");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            {currentStep > 1 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}
            <h1 className="text-xl font-semibold">注册</h1>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>步骤 {currentStep} / 3</span>
              <span>{Math.round(progressValue)}%</span>
            </div>
            <Progress value={progressValue} className="h-2" />
          </div>
        </div>

        {/* Step Content */}
        {currentStep === 1 && (
          <PhoneVerificationStep
            form={phoneForm}
            onSubmit={onPhoneVerificationSubmit}
            onSendCode={handleSendCode}
          />
        )}

        {currentStep === 2 && (
          <PasswordSetupStep
            form={passwordForm}
            onSubmit={onPasswordSetupSubmit}
            onBack={handleBackToPhoneVerification}
          />
        )}

        {currentStep === 3 && (
          <RegistrationSuccessStep
            regionCode={phoneForm.getValues("regionCode")}
            phoneNumber={phoneForm.getValues("phoneNumber")}
            onRestart={handleRestart}
            onContinue={handleContinue}
          />
        )}
      </div>
    </div>
  );
}
