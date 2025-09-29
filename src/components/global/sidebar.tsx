"use client";

import React, { useState } from "react";
import Link from "next/link";
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
  Building2,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";

interface SidebarItem {
  type: "item" | "separator";
  title?: string;
  icon?: React.ComponentType<{ className?: string }>;
  url?: string;
  isActive?: boolean;
  items?: Array<{
    title: string;
    url: string;
  }>;
}

const data: SidebarItem[] = [
  {
    type: "item",
    title: "酒店",
    icon: Hotel,
    url: "/hotel",
    isActive: false,
    items: [
      { title: "国内酒店", url: "/hotel/domestic" },
      { title: "海外酒店", url: "/hotel/international" },
      { title: "民宿客栈", url: "/hotel/homestay" },
      { title: "酒店团购", url: "/hotel/group" },
    ],
  },
  {
    type: "item",
    title: "机票",
    icon: Plane,
    url: "/flight",
    isActive: false,
    items: [
      { title: "国内机票", url: "/flight/domestic" },
      { title: "国际机票", url: "/flight/international" },
      { title: "特价机票", url: "/flight/deals" },
      { title: "机票+酒店", url: "/flight/package" },
    ],
  },
  {
    type: "item",
    title: "火车票",
    icon: Train,
    url: "/train",
    isActive: true,
    items: [
      { title: "国内火车票", url: "/train/domestic" },
      { title: "国际/中国港澳台", url: "/train/international" },
    ],
  },
  { type: "separator" },
  {
    type: "item",
    title: "旅游",
    icon: Camera,
    url: "/travel",
    isActive: false,
    items: [
      { title: "跟团游", url: "/travel/group" },
      { title: "自由行", url: "/travel/free" },
      { title: "当地玩乐", url: "/travel/local" },
      { title: "邮轮", url: "/travel/cruise" },
    ],
  },
  {
    type: "item",
    title: "门票·活动",
    icon: Ticket,
    url: "/tickets",
    isActive: false,
    items: [
      { title: "景点门票", url: "/tickets/attractions" },
      { title: "演出票", url: "/tickets/shows" },
      { title: "活动体验", url: "/tickets/activities" },
    ],
  },
  {
    type: "item",
    title: "汽车·船票",
    icon: Bus,
    url: "/transport",
    isActive: false,
    items: [
      { title: "汽车票", url: "/transport/bus" },
      { title: "船票", url: "/transport/ferry" },
      { title: "租车", url: "/transport/rental" },
    ],
  },
  {
    type: "item",
    title: "用车",
    icon: Car,
    url: "/car",
    isActive: false,
    items: [
      { title: "接送机", url: "/car/airport" },
      { title: "包车游", url: "/car/charter" },
      { title: "当地用车", url: "/car/local" },
    ],
  },
  { type: "separator" },
  {
    type: "item",
    title: "AI行程助手",
    icon: Bot,
    url: "/ai-assistant",
    isActive: false,
    items: [
      { title: "智能规划", url: "/ai-assistant/planning" },
      { title: "行程推荐", url: "/ai-assistant/recommendations" },
    ],
  },
  {
    type: "item",
    title: "攻略·景点",
    icon: BookOpen,
    url: "/guides",
    isActive: false,
    items: [
      { title: "旅游攻略", url: "/guides/travel" },
      { title: "景点介绍", url: "/guides/attractions" },
      { title: "美食推荐", url: "/guides/food" },
    ],
  },
  {
    type: "item",
    title: "旅游地图",
    icon: Map,
    url: "/map",
    isActive: false,
    items: [
      { title: "目的地地图", url: "/map/destinations" },
      { title: "交通地图", url: "/map/transport" },
    ],
  },
  { type: "separator" },
  {
    type: "item",
    title: "全球购",
    icon: ShoppingBag,
    url: "/shopping",
    isActive: false,
    items: [
      { title: "免税店", url: "/shopping/duty-free" },
      { title: "特产购物", url: "/shopping/local" },
    ],
  },
  {
    type: "item",
    title: "礼品卡",
    icon: CreditCard,
    url: "/gift-card",
    isActive: false,
    items: [
      { title: "酒店礼品卡", url: "/gift-card/hotel" },
      { title: "旅游礼品卡", url: "/gift-card/travel" },
    ],
  },
  {
    type: "item",
    title: "携程金融",
    icon: CreditCard,
    url: "/finance",
    isActive: false,
    items: [
      { title: "旅游贷", url: "/finance/loan" },
      { title: "保险服务", url: "/finance/insurance" },
    ],
  },
  {
    type: "item",
    title: "企业商旅",
    icon: Building2,
    url: "/business",
    isActive: false,
    items: [
      { title: "企业用车", url: "/business/car" },
      { title: "商务酒店", url: "/business/hotel" },
      { title: "会议服务", url: "/business/meeting" },
    ],
  },
];

export default function MainSidebar() {
  const { open, setOpen } = useSidebar();
  const [hoveredItem, setHoveredItem] = useState<SidebarItem | null>(null);
  const [hoverPosition, setHoverPosition] = useState({ top: 0 });

  const handleMouseEnter = (item: SidebarItem, event: React.MouseEvent) => {
    if (!open && item.items && item.items.length > 0) {
      const rect = event.currentTarget.getBoundingClientRect();
      setHoveredItem(item);
      setHoverPosition({ top: rect.top });
    }
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  return (
    <>
      <Sidebar
        variant="floating"
        className="border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      >
        <SidebarContent>
          <SidebarGroup>
            {/* Toggle Button */}
            <div className="flex items-center justify-center p-2">
              <button
                onClick={() => setOpen(!open)}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-md transition-colors",
                  "text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950/50"
                )}
              >
                {open ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Menu className="h-4 w-4" />
                )}
              </button>
            </div>

            <SidebarGroupContent>
              <SidebarMenu className="gap-1">
                {data.map((item, index) => {
                  if (item.type === "separator") {
                    return <SidebarSeparator key={index} className="my-2" />;
                  }

                  const Icon = item.icon;
                  const isActive = item.isActive;

                  return (
                    <SidebarMenuItem key={index}>
                      <SidebarMenuButton
                        asChild
                        className={cn(
                          "h-10 transition-all duration-200",
                          open ? "px-3 justify-start" : "px-0 justify-center",
                          isActive
                            ? "bg-blue-600 text-white rounded-xl hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                            : "text-foreground hover:bg-blue-50 hover:text-blue-600 rounded-md dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
                        )}
                        onMouseEnter={e => handleMouseEnter(item, e)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <Link
                          href={item.url || "#"}
                          className="flex items-center gap-3 w-full"
                        >
                          {Icon && (
                            <Icon
                              className={cn(
                                "h-4 w-4 flex-shrink-0",
                                isActive
                                  ? "text-white"
                                  : "text-blue-600 dark:text-blue-400"
                              )}
                            />
                          )}
                          {open && (
                            <span className="truncate">{item.title}</span>
                          )}
                        </Link>
                      </SidebarMenuButton>

                      {/* Show secondary items when expanded and active */}
                      {open &&
                        isActive &&
                        item.items &&
                        item.items.length > 0 && (
                          <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
                            {item.items.map((subItem, subIndex) => (
                              <SidebarMenuSubItem key={subIndex}>
                                <SidebarMenuSubButton
                                  asChild
                                  className="text-muted-foreground hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
                                >
                                  <Link href={subItem.url}>
                                    {subItem.title}
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        )}
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      {/* Floating hover menu for collapsed state */}
      {!open &&
        hoveredItem &&
        hoveredItem.items &&
        hoveredItem.items.length > 0 && (
          <div
            className="fixed left-16 z-50 min-w-48 rounded-lg border bg-popover p-2 shadow-lg animate-in fade-in-0 zoom-in-95"
            style={{ top: hoverPosition.top }}
            onMouseEnter={() => setHoveredItem(hoveredItem)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="space-y-1">
              {hoveredItem.items.map((subItem, index) => (
                <Link
                  key={index}
                  href={subItem.url}
                  className="block rounded-md px-3 py-2 text-sm text-foreground hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/50 dark:hover:text-blue-400 transition-colors"
                >
                  {subItem.title}
                </Link>
              ))}
            </div>
          </div>
        )}
    </>
  );
}
