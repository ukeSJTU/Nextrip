"use client";

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
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
import { CheckCircle2, ArrowLeft } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

// Form schemas for each step
const phoneVerificationSchema = z.object({
  regionCode: z.string().min(1, "请选择国家/地区"),
  phoneNumber: z.string().min(6, "请输入有效的手机号"),
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

type PhoneVerificationForm = z.infer<typeof phoneVerificationSchema>;
type PasswordSetupForm = z.infer<typeof passwordSetupSchema>;

export default function SignupPage() {
  // UI-only state (no real logic yet)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form instances for each step
  const phoneForm = useForm<PhoneVerificationForm>({
    resolver: zodResolver(phoneVerificationSchema),
    defaultValues: {
      regionCode: "CN +86",
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

  const steps = [
    { id: 1, title: "验证手机", description: "输入手机号并验证" },
    { id: 2, title: "设置密码", description: "为您的账户设置密码" },
    { id: 3, title: "注册成功", description: "完成注册流程" },
  ];

  const progressValue = useMemo(
    () => (currentStep / steps.length) * 100,
    [currentStep]
  );

  const handleSendCode = () => {
    // Placeholder for sending SMS code. Actual logic will be added later.
  };

  const onPhoneVerificationSubmit = (data: PhoneVerificationForm) => {
    console.log("Phone verification data:", data);
    setCurrentStep(2);
  };

  const onPasswordSetupSubmit = (data: PasswordSetupForm) => {
    console.log("Password setup data:", data);
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
          <Form {...phoneForm}>
            <form
              onSubmit={phoneForm.handleSubmit(onPhoneVerificationSubmit)}
              className="space-y-6"
            >
              {/* Phone number */}
              <div className="space-y-2">
                <FormLabel className="text-gray-700">手机号</FormLabel>
                <div className="flex gap-3">
                  <FormField
                    control={phoneForm.control}
                    name="regionCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="选择国家/地区" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="CN +86">
                                中国大陆 +86
                              </SelectItem>
                              <SelectItem value="HK +852">
                                中国香港 +852
                              </SelectItem>
                              <SelectItem value="TW +886">
                                中国台湾 +886
                              </SelectItem>
                              <SelectItem value="US +1">美国 +1</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={phoneForm.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input {...field} placeholder="有效手机号" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* OTP */}
              <div className="space-y-2">
                <FormLabel className="text-gray-700">短信验证码</FormLabel>
                <div className="flex items-center gap-3">
                  <FormField
                    control={phoneForm.control}
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
                  >
                    发送验证码
                  </Button>
                </div>
              </div>

              {/* Consent */}
              <FormField
                control={phoneForm.control}
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
                <a href="#" className="text-blue-600 text-sm hover:underline">
                  企业客户注册
                </a>
              </div>
            </form>
          </Form>
        )}

        {currentStep === 2 && (
          <Form {...passwordForm}>
            <form
              onSubmit={passwordForm.handleSubmit(onPasswordSetupSubmit)}
              className="space-y-6"
            >
              <FormField
                control={passwordForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>设置密码</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="至少 6 位，包含字母与数字"
                      />
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
                control={passwordForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>确认密码</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="再次输入密码"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator />

              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setCurrentStep(1)}
                >
                  返回手机验证
                </Button>
                <Button type="submit">完成注册</Button>
              </div>
            </form>
          </Form>
        )}

        {currentStep === 3 && (
          <div className="space-y-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
              <h2 className="text-lg font-semibold">注册成功</h2>
              <p className="text-sm text-gray-600">
                您的手机号 {phoneForm.getValues("regionCode")}{" "}
                {phoneForm.getValues("phoneNumber")} 已完成注册
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
