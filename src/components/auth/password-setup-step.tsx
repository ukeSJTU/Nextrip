"use client";

import { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
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

export interface PasswordSetupForm {
  password: string;
  confirmPassword: string;
}

interface PasswordSetupStepProps {
  form: UseFormReturn<PasswordSetupForm>;
  onSubmit: (data: PasswordSetupForm) => void;
  onBack: () => void;
}

export function PasswordSetupStep({
  form,
  onSubmit,
  onBack,
}: PasswordSetupStepProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const password = form.watch("password");
  const confirmPassword = form.watch("confirmPassword");

  const validatePassword = (password: string) => {
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isValidLength = password.length >= 8 && password.length <= 20;

    return hasLetter && hasNumber && hasSymbol && isValidLength;
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>设置密码</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    placeholder="至少 6 位，包含字母与数字"
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
              <FormMessage />
              {/* simple strength indicator */}
              <div className="mt-2">
                <Progress
                  value={Math.min(field.value.length * 10, 100)}
                  className="h-1"
                />
              </div>
            </FormItem>
          )}
        />

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
                    placeholder="再次输入密码"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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

        <Separator />

        <div className="flex justify-between">
          <Button type="button" variant="secondary" onClick={onBack}>
            返回手机验证
          </Button>
          <Button type="submit">完成注册</Button>
        </div>
      </form>
    </Form>
  );
}
