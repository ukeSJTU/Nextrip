"use client";

import {
  Hotel,
  Plane,
  Train,
  Camera,
  Ticket,
  Bus,
  Car,
  Bot,
  BookOpen,
  Map,
  ShoppingBag,
  CreditCard,
  Wallet,
  Building2,
  LucideIcon,
  Menu,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

type SidebarItem =
  | {
      name: string;
      icon?: LucideIcon;
      url?: string;
      secondary?: Array<{ name: string; url: string }>;
      type?: never;
      isActive?: boolean;
    }
  | {
      type: "separator";
      name?: never;
      icon?: never;
      url?: never;
      secondary?: never;
      isActive?: never;
    };

const data: SidebarItem[] = [
  {
    name: "酒店",
    icon: Hotel,
    url: "#",
    secondary: [
      {
        name: "国内酒店",
        url: "#",
      },
      {
        name: "国际酒店",
        url: "#",
      },
      {
        name: "民宿·客栈",
        url: "#",
      },
    ],
  },
  {
    name: "机票",
    icon: Plane,
    url: "#",
    secondary: [
      {
        name: "国内/国际/港澳台",
        url: "#",
      },
      {
        name: "特价机票",
        url: "#",
      },
      {
        name: "航班动态",
        url: "#",
      },
      {
        name: "值机选座",
        url: "#",
      },
    ],
  },
  {
    name: "火车票",
    icon: Train,
    url: "#",
    isActive: true,
    secondary: [
      {
        name: "国内火车票",
        url: "#",
      },
      {
        name: "国际/中国港澳台",
        url: "#",
      },
    ],
  },
  {
    name: "旅游",
    icon: Camera,
    url: "#",
    secondary: [
      {
        name: "跟团游",
        url: "#",
      },
      {
        name: "自由行",
        url: "#",
      },
      {
        name: "当地玩乐",
        url: "#",
      },
    ],
  },
  {
    name: "门票·活动",
    icon: Ticket,
    url: "#",
    secondary: [
      {
        name: "景点门票",
        url: "#",
      },
      {
        name: "演出票务",
        url: "#",
      },
      {
        name: "活动体验",
        url: "#",
      },
    ],
  },
  {
    name: "汽车·船票",
    icon: Bus,
    url: "#",
    secondary: [
      {
        name: "汽车票",
        url: "#",
      },
      {
        name: "船票",
        url: "#",
      },
    ],
  },
  {
    name: "用车",
    icon: Car,
    url: "#",
    secondary: [
      {
        name: "接送机",
        url: "#",
      },
      {
        name: "包车游",
        url: "#",
      },
      {
        name: "当地用车",
        url: "#",
      },
    ],
  },
  {
    type: "separator",
  },
  {
    name: "AI行程助手",
    icon: Bot,
    url: "#",
  },
  {
    name: "攻略·景点",
    icon: BookOpen,
    url: "#",
    secondary: [
      {
        name: "旅游攻略",
        url: "#",
      },
      {
        name: "景点介绍",
        url: "#",
      },
    ],
  },
  {
    name: "旅游地图",
    icon: Map,
    url: "#",
  },
  {
    name: "全球购",
    icon: ShoppingBag,
    url: "#",
    secondary: [
      {
        name: "免税店",
        url: "#",
      },
      {
        name: "特产商城",
        url: "#",
      },
    ],
  },
  {
    name: "礼品卡",
    icon: CreditCard,
    url: "#",
  },
  {
    name: "携程金融",
    icon: Wallet,
    url: "#",
    secondary: [
      {
        name: "分期付款",
        url: "#",
      },
      {
        name: "保险服务",
        url: "#",
      },
    ],
  },
  {
    type: "separator",
  },
  {
    name: "企业商旅",
    icon: Building2,
    url: "#",
  },
];

interface HoverMenuProps {
  items: Array<{ name: string; url: string }>;
  show: boolean;
  position: { top: number };
}

function HoverMenu({ items, show, position }: HoverMenuProps) {
  if (!show || !items.length) return null;

  return (
    <div
      className="fixed left-16 z-50 min-w-[200px] rounded-lg border bg-white shadow-lg transition-all duration-200 ease-out animate-in fade-in-0 slide-in-from-left-1"
      style={{ top: position.top }}
    >
      {items.map((item, index) => (
        <a
          key={index}
          href={item.url}
          className="block px-4 py-3 text-sm text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150 first:rounded-t-lg last:rounded-b-lg"
        >
          {item.name}
        </a>
      ))}
    </div>
  );
}

export default function MainSidebar() {
  const { state } = useSidebar();
  const [hoveredItem, setHoveredItem] = useState<{
    index: number;
    items: Array<{ name: string; url: string }>;
    position: { top: number };
  } | null>(null);

  const handleMouseEnter = (
    index: number,
    items: Array<{ name: string; url: string }> | undefined,
    event: React.MouseEvent
  ) => {
    if (items && items.length > 0 && state === "collapsed") {
      const rect = event.currentTarget.getBoundingClientRect();
      setHoveredItem({
        index,
        items,
        position: { top: rect.top },
      });
    }
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setHoveredItem(null);
    }, 100);
  };

  const handleHoverMenuMouseEnter = () => {
    // Keep the hover menu open when hovering over it
  };

  const handleHoverMenuMouseLeave = () => {
    setHoveredItem(null);
  };

  return (
    <>
      <Sidebar
        collapsible="icon"
        className="border-r border-gray-200 bg-gray-50 transition-all duration-300"
      >
        <SidebarContent className="px-2 py-4">
          {/* 汉堡菜单按钮 */}
          <div className="mb-4 px-2">
            <SidebarTrigger className="h-8 w-8 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" />
          </div>

          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {data.map((item, index) => {
                  if (item.type === "separator") {
                    return (
                      <div key={index} className="h-px bg-gray-200 my-3 mx-2" />
                    );
                  }

                  const IconComponent = item.icon;
                  const hasSecondary =
                    item.secondary && item.secondary.length > 0;
                  const isActive = item.isActive;

                  return (
                    <SidebarMenuItem key={index}>
                      <SidebarMenuButton
                        asChild
                        tooltip={state === "collapsed" ? item.name : undefined}
                        className={cn(
                          "h-12 px-3 transition-all duration-200 rounded-xl group relative",
                          "hover:bg-blue-50 hover:text-blue-600",
                          isActive &&
                            "bg-blue-500 text-white hover:bg-blue-600 hover:text-white shadow-md",
                          hasSecondary &&
                            state === "collapsed" &&
                            "cursor-pointer",
                          hoveredItem?.index === index &&
                            state === "collapsed" &&
                            !isActive &&
                            "bg-blue-50 text-blue-600"
                        )}
                        onMouseEnter={e =>
                          handleMouseEnter(index, item.secondary, e)
                        }
                        onMouseLeave={handleMouseLeave}
                      >
                        <a
                          href={item.url}
                          className="flex items-center gap-3 w-full"
                        >
                          {IconComponent && (
                            <IconComponent
                              className={cn(
                                "h-5 w-5 shrink-0 transition-colors",
                                isActive ? "text-white" : "text-blue-500"
                              )}
                            />
                          )}
                          <span
                            className={cn(
                              "transition-all duration-200 font-medium text-sm",
                              "group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:w-0 overflow-hidden",
                              isActive ? "text-white" : "text-gray-700"
                            )}
                          >
                            {item.name}
                          </span>
                        </a>
                      </SidebarMenuButton>

                      {/* 展开状态下的子菜单 */}
                      {hasSecondary && state === "expanded" && isActive && (
                        <div className="ml-8 mt-1 space-y-1">
                          {item.secondary?.map((subItem, subIndex) => (
                            <a
                              key={subIndex}
                              href={subItem.url}
                              className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                              {subItem.name}
                            </a>
                          ))}
                        </div>
                      )}
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      {/* Hover menu for collapsed state */}
      {state === "collapsed" && hoveredItem && (
        <div
          onMouseEnter={handleHoverMenuMouseEnter}
          onMouseLeave={handleHoverMenuMouseLeave}
        >
          <HoverMenu
            items={hoveredItem.items}
            show={true}
            position={hoveredItem.position}
          />
        </div>
      )}
    </>
  );
}
