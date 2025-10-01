import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8">
      <div className="max-w-6xl w-full flex items-center justify-center gap-12">
        {/* 左侧图片区域 */}
        <div className="flex-1 max-w-lg">
          <Image
            src="/assets/not-found.png"
            alt="功能开发中"
            width={500}
            height={400}
            className="w-full h-auto object-contain"
            priority
          />
        </div>

        {/* 右侧文本区域 */}
        <div className="flex-1 max-w-lg space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-gray-900">功能开发中</h1>
            <p className="text-xl text-gray-600">
              该功能正在紧张开发中，敬请期待
            </p>
            <p className="text-gray-500 leading-relaxed">
              我们正在努力为您打造更好的体验，该功能即将上线。感谢您的耐心等待，我们会尽快完善相关功能。
            </p>
          </div>

          <div className="space-y-4">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/">
                <Home className="w-5 h-5 mr-2" />
                返回首页
              </Link>
            </Button>

            <Button
              variant="outline"
              asChild
              size="lg"
              className="w-full sm:w-auto ml-0 sm:ml-4"
            >
              <Link href="javascript:history.back()">
                <ArrowLeft className="w-5 h-5 mr-2" />
                返回上一页
              </Link>
            </Button>
          </div>

          <div className="pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-400">
              如有疑问或建议，请联系我们的客服团队
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
