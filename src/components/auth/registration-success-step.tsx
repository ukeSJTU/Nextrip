"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2 } from "lucide-react";

export interface RegistrationSuccessStepProps {
  regionCode: string;
  phoneNumber: string;
  onRestart: () => void;
  onContinue: () => void;
}

export function RegistrationSuccessStep({
  regionCode,
  phoneNumber,
  onRestart,
  onContinue,
}: RegistrationSuccessStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">注册成功！</h2>
        <p className="text-gray-600">
          您的账号已成功注册到手机号{" "}
          <span className="font-medium">
            {regionCode}
            {phoneNumber}
          </span>
        </p>
      </div>

      <Separator />

      <div className="flex justify-center gap-3">
        <Button variant="secondary" onClick={onRestart}>
          重新注册
        </Button>
        <Button onClick={onContinue}>开始使用</Button>
      </div>
    </div>
  );
}
