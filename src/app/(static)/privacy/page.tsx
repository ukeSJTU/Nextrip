import { Metadata } from "next";
import PrivacyContent from "@/content/privacy.md";

export const metadata: Metadata = {
  title: "Nextrip 隐私政策",
  description: "Nextrip 旅行平台的隐私政策和个人信息保护说明",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* 页面头部 */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-green-50 dark:bg-green-900/20 rounded-full mb-4">
            <span className="text-sm font-medium text-green-700 dark:text-green-300">
              隐私保护
            </span>
          </div>
        </div>

        {/* Markdown 内容 */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <PrivacyContent />
        </div>

        {/* 页面底部 */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <svg
                  className="w-6 h-6 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                  隐私问题咨询
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  如果您对我们的隐私政策有任何疑问或需要行使您的数据权利，请联系我们的数据保护团队。
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="mailto:privacy@nextrip.com"
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    隐私邮箱
                  </a>
                  <a
                    href="mailto:dpo@nextrip.com"
                    className="inline-flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    数据保护官
                  </a>
                  <a
                    href="tel:400-123-4567"
                    className="inline-flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    电话咨询
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 数据权利快速链接 */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    查看数据
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    访问您的个人信息
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-yellow-600 dark:text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    更正数据
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    修改不准确信息
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-red-600 dark:text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    删除数据
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    请求删除个人信息
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-purple-600 dark:text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    导出数据
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    获取数据副本
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
