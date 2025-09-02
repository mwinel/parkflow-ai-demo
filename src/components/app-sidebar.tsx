"use client";

import * as React from "react";
import {
  Command,
  CreditCard,
  DoorOpen,
  GitBranch,
  LifeBuoy,
  Mails,
  Send,
  Settings2,
  Zap,
  Car,
  Building2,
  Calendar,
  BarChart3,
  Ticket,
  ShieldCheck,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavNodes } from "@/components/nav-nodes";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "Nelson Murungi",
    email: "nelsonmwirumubi@gmail.com",
    avatar: "https://avatars.githubusercontent.com/u/14992011?v=4",
  },
  navMain: [
    {
      title: "Reports",
      url: "/reports",
      icon: BarChart3,
      isActive: true,
      items: [
        { title: "Occupancy", url: "/reports/occupancy" },
        { title: "Revenue", url: "/reports/revenue" },
        { title: "Operations", url: "/reports/operations" },
      ],
    },
    {
      title: "Facilities",
      url: "/facilities",
      icon: Building2,
      items: [
        { title: "Sites", url: "/facilities" },
        { title: "Parking Lots", url: "/facilities/lots" },
        { title: "Zones & Levels", url: "/facilities/zones" },
      ],
    },
    {
      title: "Vehicles",
      url: "/vehicles",
      icon: Car,
      items: [
        { title: "Directory", url: "/vehicles" },
        { title: "Visits", url: "/vehicles/visits" },
        { title: "Watchlists", url: "/vehicles/watchlists" },
      ],
    },
    {
      title: "Reservations",
      url: "/reservations",
      icon: Calendar,
      items: [
        { title: "Bookings", url: "/reservations" },
        { title: "Time Rules", url: "/reservations/rules" },
      ],
    },
    {
      title: "Permits",
      url: "/permits",
      icon: Ticket,
      items: [
        { title: "Subscriptions", url: "/permits" },
        { title: "Holders", url: "/permits/holders" },
      ],
    },
    {
      title: "Enforcement",
      url: "/enforcement",
      icon: ShieldCheck,
      items: [
        { title: "Violations", url: "/enforcement/violations" },
        { title: "Appeals", url: "/enforcement/appeals" },
      ],
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings2,
      items: [
        { title: "General", url: "/settings" },
        { title: "Team", url: "/settings/team" },
        { title: "Limits", url: "/settings/limits" },
        { title: "Pricing & Billing", url: "/billing" },
        { title: "Integrations", url: "/integrations" },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  nodes: [
    {
      name: "Trigger",
      url: "#",
      icon: Zap,
    },
    {
      name: "Condition",
      url: "#",
      icon: GitBranch,
    },
    {
      name: "Payments",
      url: "#",
      icon: CreditCard,
    },
    {
      name: "Alerts",
      url: "#",
      icon: Mails,
    },
    {
      name: "Gates",
      url: "#",
      icon: DoorOpen,
    },
  ],
};

export function AppSidebar({
  onAddNode,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  onAddNode?: (nodeData: any) => void;
}) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-indigo-500 text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Parkflow AI</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavNodes nodes={data.nodes} onAddNode={onAddNode} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
