"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface RegistrationSuccessStepProps {
  phoneNumber: string;
}

export function RegistrationSuccessStep({
  phoneNumber,
}: RegistrationSuccessStepProps) {
  const handleLogin = () => {
    // TODO: Implement login functionality
    console.log("Navigate to login page");
  };

  return (
    <div className="space-y-6 text-center">
      {/* Success Icon */}
      <div className="flex justify-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
      </div>

      {/* Success Message */}
      <div>
        <h3 className="text-lg font-medium text-gray-900">注册成功！</h3>
        <p className="mt-2 text-sm text-gray-600">恭喜您，账户已成功创建</p>
      </div>

      {/* Phone Number Display */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="text-sm text-gray-600">注册手机号</div>
        <div className="text-lg font-medium text-gray-900">{phoneNumber}</div>
      </div>

      {/* Success Details */}
      <div className="space-y-2 text-sm text-gray-600">
        <p>✓ 手机号验证完成</p>
        <p>✓ 密码设置完成</p>
        <p>✓ 账户创建成功</p>
      </div>

      {/* Login Button */}
      <Button onClick={handleLogin} className="w-full" size="lg">
        立即登录
      </Button>

      {/* Additional Info */}
      <p className="text-xs text-gray-500">
        您现在可以使用注册的手机号和密码登录系统
      </p>
    </div>
  );
}
