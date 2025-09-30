"use client";

import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import {
  PasswordSetupStep,
  PhoneVerificationStep,
  RegistrationSuccessStep,
} from "@/components/auth";

export default function SignupPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const steps = [
    { id: 1, title: "验证手机", description: "输入手机号并验证" },
    { id: 2, title: "设置密码", description: "为您的账户设置密码" },
    { id: 3, title: "注册成功", description: "完成注册流程" },
  ];

  const progressValue = (currentStep / steps.length) * 100;

  const handlePhoneVerified = (phone: string) => {
    setPhoneNumber(phone);
    setIsVerified(true);
    setCurrentStep(2);
  };

  const handlePasswordSet = () => {
    setCurrentStep(3);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-xs text-gray-500 mb-2">
              {steps.map(step => (
                <span
                  key={step.id}
                  className={`${
                    currentStep >= step.id ? "text-blue-600 font-medium" : ""
                  }`}
                >
                  {step.title}
                </span>
              ))}
            </div>
            <Progress value={progressValue} className="h-2" />
            <div className="mt-2 text-center">
              <span className="text-sm text-gray-600">
                第 {currentStep} 步，共 {steps.length} 步
              </span>
            </div>
          </div>

          {/* Step Content */}
          <div className="space-y-6">
            {currentStep === 1 && (
              <PhoneVerificationStep onVerified={handlePhoneVerified} />
            )}
            {currentStep === 2 && (
              <PasswordSetupStep
                phoneNumber={phoneNumber}
                onPasswordSet={handlePasswordSet}
              />
            )}
            {currentStep === 3 && (
              <RegistrationSuccessStep phoneNumber={phoneNumber} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
