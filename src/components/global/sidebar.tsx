"use client";

import { Hotel, Plane, Route, Train, LucideIcon } from "lucide-react";
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
    }
  | {
      type: "separator";
      name?: never;
      icon?: never;
      url?: never;
      secondary?: never;
    };

const data: SidebarItem[] = [
  {
    name: "Hotel",
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
    ],
  },
  {
    name: "Plane",
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
      {
        name: "退票改签",
        url: "#",
      },
      {
        name: "报销凭证",
        url: "#",
      },
    ],
  },
  {
    name: "Train",
    icon: Train,
    url: "#",
    secondary: [
      {
        name: "国内火车票",
        url: "#",
      },
      {
        name: "国际火车票",
        url: "#",
      },
    ],
  },
  {
    type: "separator",
  },
  {
    name: "AI行程助手",
    icon: Route,
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
      className="fixed left-16 z-50 min-w-[200px] rounded-md border bg-popover p-1 text-popover-foreground shadow-lg transition-all duration-200 ease-out animate-in fade-in-0 slide-in-from-left-1"
      style={{ top: position.top }}
    >
      {items.map((item, index) => (
        <a
          key={index}
          href={item.url}
          className="block px-3 py-2 text-sm rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors duration-150"
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
    // Add a small delay to prevent flickering when moving between sidebar and hover menu
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
        className="border-r transition-all duration-300"
      >
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {data.map((item, index) => {
                  if (item.type === "separator") {
                    return <SidebarSeparator key={index} className="my-2" />;
                  }

                  const IconComponent = item.icon;
                  const hasSecondary =
                    item.secondary && item.secondary.length > 0;

                  return (
                    <SidebarMenuItem key={index}>
                      <SidebarMenuButton
                        asChild
                        tooltip={state === "collapsed" ? item.name : undefined}
                        className={cn(
                          "h-12 transition-all duration-200",
                          hasSecondary &&
                            state === "collapsed" &&
                            "cursor-pointer",
                          hoveredItem?.index === index &&
                            state === "collapsed" &&
                            "bg-accent"
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
                            <IconComponent className="h-5 w-5 shrink-0" />
                          )}
                          <span className="transition-all duration-200 group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:w-0 overflow-hidden">
                            {item.name}
                          </span>
                        </a>
                      </SidebarMenuButton>
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
