"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Eye, EyeOff } from "lucide-react";
import { authClient } from "@/lib/auth/auth-client";

interface PasswordSetupStepProps {
  phoneNumber: string;
  onPasswordSet: (password: string) => void;
}

interface FormData {
  password: string;
  confirmPassword: string;
}

export function PasswordSetupStep({
  phoneNumber,
  onPasswordSet,
}: PasswordSetupStepProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const password = form.watch("password");
  const confirmPassword = form.watch("confirmPassword");

  const validatePassword = (password: string) => {
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isValidLength = password.length >= 8 && password.length <= 20;

    return hasLetter && hasNumber && hasSymbol && isValidLength;
  };

  const handleSubmit = async () => {
    // Validate password
    if (!validatePassword(password)) {
      form.setError("password", {
        message: "密码需为8-20位字母、数字和符号的组合",
      });
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      form.setError("confirmPassword", {
        message: "两次输入的密码不一致",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Use Better Auth's sign-in to complete the registration
      // The user was already created during OTP verification with signUpOnVerification
      const { data, error } = await authClient.signIn.phoneNumber({
        phoneNumber,
        password,
      });

      if (!error && data) {
        console.log("User signed in successfully:", data.user);
        onPasswordSet(password);
      } else {
        form.setError("password", {
          message: error?.message || "注册失败，请重试",
        });
      }
    } catch (error) {
      form.setError("password", { message: "网络错误，请重试" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-900">设置密码</h3>
        <p className="mt-2 text-sm text-gray-600">为您的账户设置一个安全密码</p>
      </div>

      {/* Display Phone Number */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="text-sm text-gray-600">注册手机号</div>
        <div className="text-lg font-medium text-gray-900">{phoneNumber}</div>
      </div>

      <Form {...form}>
        <div className="space-y-4">
          {/* Password Input */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>密码</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder="请输入密码"
                      className="pr-10"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <div className="text-xs text-gray-500">
                  密码需为8-20位字母、数字和符号的组合
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password Input */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>确认密码</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="请再次输入密码"
                      className="pr-10"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={!password || !confirmPassword || isLoading}
            className="w-full"
          >
            {isLoading ? "设置中..." : "完成注册"}
          </Button>
        </div>
      </Form>
    </div>
  );
}
