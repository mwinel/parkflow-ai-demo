"use client";

import {
  Folder,
  MoreHorizontal,
  Share,
  Trash2,
  type LucideIcon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function NavNodes({
  nodes,
  onAddNode,
}: {
  nodes: {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
  onAddNode?: (nodeData: any) => void;
}) {
  const { isMobile } = useSidebar();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Add Nodes</SidebarGroupLabel>
      <SidebarMenu>
        {nodes.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton
              asChild
              onClick={(e) => {
                e.preventDefault();
                if (!onAddNode) return;
                const now = Date.now();
                switch (item.name.toLowerCase()) {
                  case "trigger":
                    onAddNode({
                      id: `trigger-${now}`,
                      type: "trigger",
                      label: "New Trigger",
                      description: "Trigger node for workflow initiation",
                    });
                    break;
                  case "condition":
                    onAddNode({
                      id: `condition-${now}`,
                      type: "condition",
                      label: "New Condition",
                      description: "Condition node for workflow decisions",
                      trueLabel: "Yes",
                      falseLabel: "No",
                    });
                    break;
                  case "payments":
                    onAddNode({
                      id: `action-${now}`,
                      type: "action",
                      label: "Request payment",
                      description:
                        "Send a Stripe payment link to collect parking fees.",
                      showIntegrations: true,
                      integrations: ["Stripe", "Twilio", "SendGrid"],
                      actionCategory: "payment",
                    });
                    break;
                  case "alerts":
                    onAddNode({
                      id: `action-${now}`,
                      type: "action",
                      label: "Send notification",
                      description: "Send SMS/email notification to the user.",
                      showIntegrations: true,
                      integrations: ["Twilio", "SendGrid"],
                      actionCategory: "notification",
                    });
                    break;
                  case "gates":
                    onAddNode({
                      id: `action-${now}`,
                      type: "action",
                      label: "Open gate",
                      description: "Trigger gate mechanism to allow vehicle.",
                      showIntegrations: false,
                      integrations: [],
                      actionCategory: "gate",
                    });
                    break;
                  default:
                    break;
                }
              }}
            >
              <a href={item.url}>
                <item.icon />
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
