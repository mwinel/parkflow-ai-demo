import { memo, useState } from "react";
import type { Node, NodeProps } from "@xyflow/react";
import { Handle, Position } from "@xyflow/react";
import {
  BaseNode,
  BaseNodeContent,
  BaseNodeFooter,
  BaseNodeHeader,
  BaseNodeHeaderTitle,
} from "@/components/ui/base-node";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { EllipsisVertical } from "lucide-react";
import { NodeStatusIndicator } from "@/components/ui/node-status-indicator";
import { BaseHandle } from "../ui/base-handle";

export type ActionNodeData = {
  label?: string;
  description?: string;
  integrations?: string[];
  showIntegrations?: boolean;
  targetHandlePosition?: Position;
  sourceHandlePosition?: Position;
  additionalTargetHandlePositions?: Position[];
  additionalSourceHandlePositions?: Position[];
  actionCategory?: "notification" | "payment" | "gate";
};

export type ActionNode = Node<ActionNodeData>;

const ActionNodeComponent = memo(function ActionNode({
  id,
  data,
}: NodeProps<ActionNode>) {
  const [isEditingLabel, setIsEditingLabel] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [labelDraft, setLabelDraft] = useState<string>(data.label ?? "Action");
  const [descDraft, setDescDraft] = useState<string>(
    data.description ||
      "This action executes a specific task in the parking workflow. Actions can include opening gates, sending notifications, generating invoices, or applying charges based on the conditions and triggers in the system."
  );
  const [isIntegrationsOpen, setIsIntegrationsOpen] = useState(false);

  const commitLabel = () => {
    (data as any).onUpdateNodeData?.(id, { label: labelDraft });
    setIsEditingLabel(false);
  };

  const commitDescription = () => {
    (data as any).onUpdateNodeData?.(id, { description: descDraft });
    setIsEditingDescription(false);
  };

  const currentIntegrations = data.integrations ?? [];
  const toggleIntegration = (name: string) => {
    const exists = currentIntegrations.includes(name);
    const next = exists
      ? currentIntegrations.filter((i) => i !== name)
      : [...currentIntegrations, name];
    (data as any).onUpdateNodeData?.(id, {
      integrations: next,
      showIntegrations: next.length > 0,
    });
  };
  return (
    <BaseNode className="bg-purple-50 border-purple-200 [.react-flow\_\_node.selected_&]:border-purple-400 min-w-[320px] w-[320px]">
      <BaseNodeHeader className="border-b">
        <BaseNodeHeaderTitle>
          {isEditingLabel ? (
            <input
              className="nodrag w-full bg-transparent outline-none border rounded px-2 py-1 text-sm"
              value={labelDraft}
              onChange={(e) => setLabelDraft(e.target.value)}
              onBlur={commitLabel}
              onKeyDown={(e) => {
                if (e.key === "Enter") commitLabel();
                if (e.key === "Escape") setIsEditingLabel(false);
              }}
              autoFocus
            />
          ) : (
            <span onDoubleClick={() => setIsEditingLabel(true)}>
              {data.label ?? "Action"}
            </span>
          )}
        </BaseNodeHeaderTitle>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="nodrag p-1 bg-purple-100 hover:bg-purple-200 text-purple-800"
              aria-label="Node Actions"
              title="Node Actions"
            >
              <EllipsisVertical className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Node Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setIsEditingLabel(true)}>
              Edit title
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsEditingDescription(true)}>
              Edit description
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                setIsIntegrationsOpen(true);
              }}
            >
              Integrations…
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => (data as any).onDeleteNode?.(id)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </BaseNodeHeader>
      <BaseNodeContent className="w-full">
        {isEditingDescription ? (
          <textarea
            className="nodrag w-full bg-transparent outline-none border rounded px-2 py-1 text-sm"
            rows={3}
            value={descDraft}
            onChange={(e) => setDescDraft(e.target.value)}
            onBlur={commitDescription}
          />
        ) : (
          <p onDoubleClick={() => setIsEditingDescription(true)}>
            {data.description ||
              "This action executes a specific task in the parking workflow. " +
                "Actions can include opening gates, sending notifications, " +
                "generating invoices, or applying charges based on the " +
                "conditions and triggers in the system."}
          </p>
        )}

        {data.showIntegrations &&
          data.integrations &&
          data.integrations.length > 0 && (
            <div className="mt-3 p-2 bg-gray-50 rounded border">
              <div className="text-xs font-medium text-gray-600 mb-1">
                Integrations:
              </div>
              <div className="flex flex-wrap gap-1">
                {data.integrations.map((integration, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded"
                  >
                    {integration}
                  </span>
                ))}
              </div>
            </div>
          )}
      </BaseNodeContent>
      <Dialog open={isIntegrationsOpen} onOpenChange={setIsIntegrationsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Manage integrations</DialogTitle>
            <DialogDescription>
              Add or remove integrations for this action.
            </DialogDescription>
          </DialogHeader>

          {/* Debug info */}
          <div className="text-xs text-gray-500 mb-4">
            Action category: {data.actionCategory || "undefined"}
          </div>

          {data.actionCategory === "notification" && (
            <div className="space-y-3">
              <Label htmlFor="twilio">
                <Checkbox
                  id="twilio"
                  checked={currentIntegrations.includes("Twilio")}
                  onCheckedChange={() => toggleIntegration("Twilio")}
                />
                Twilio
              </Label>
              <Label htmlFor="sendgrid">
                <Checkbox
                  id="sendgrid"
                  checked={currentIntegrations.includes("SendGrid")}
                  onCheckedChange={() => toggleIntegration("SendGrid")}
                />
                SendGrid
              </Label>
            </div>
          )}

          {data.actionCategory === "payment" && (
            <div className="space-y-3">
              <Label htmlFor="stripe">
                <Checkbox
                  id="stripe"
                  checked={currentIntegrations.includes("Stripe")}
                  onCheckedChange={() => toggleIntegration("Stripe")}
                />
                Stripe
              </Label>
              <Label htmlFor="twilio">
                <Checkbox
                  id="twilio"
                  checked={currentIntegrations.includes("Twilio")}
                  onCheckedChange={() => toggleIntegration("Twilio")}
                />
                Twilio
              </Label>
              <Label htmlFor="sendgrid">
                <Checkbox
                  id="sendgrid"
                  checked={currentIntegrations.includes("SendGrid")}
                  onCheckedChange={() => toggleIntegration("SendGrid")}
                />
                SendGrid
              </Label>
            </div>
          )}

          {!data.actionCategory && (
            <div className="text-sm text-gray-500">
              No action category set. This action node needs an actionCategory to manage integrations.
            </div>
          )}

          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => setIsIntegrationsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                (data as any).onUpdateNodeData?.(id, {
                  showIntegrations: (data.integrations ?? []).length > 0,
                });
                setIsIntegrationsOpen(false);
              }}
            >
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <BaseHandle
        id="target-1"
        type="target"
        position={data.targetHandlePosition ?? Position.Top}
        className="bg-green-500"
      />
      {(data.additionalTargetHandlePositions ?? []).map((pos, idx) => (
        <BaseHandle
          key={`target-extra-${idx}`}
          id={`target-${pos.toString().toLowerCase()}`}
          type="target"
          position={pos}
          className="bg-green-500"
        />
      ))}
      <BaseHandle
        id="source-1"
        type="source"
        position={data.sourceHandlePosition ?? Position.Bottom}
        className="bg-green-500"
      />
      {(data.additionalSourceHandlePositions ?? []).map((pos, idx) => (
        <BaseHandle
          key={`source-extra-${idx}`}
          id={`source-${pos.toString().toLowerCase()}`}
          type="source"
          position={pos}
          className="bg-green-500"
        />
      ))}
    </BaseNode>
  );
});

ActionNodeComponent.displayName = "ActionNode";

export default ActionNodeComponent;
