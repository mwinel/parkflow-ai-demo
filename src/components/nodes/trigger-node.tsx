import { memo, useState } from "react";
import type { Node, NodeProps } from "@xyflow/react";
import { Position } from "@xyflow/react";
import {
  BaseNode,
  BaseNodeContent,
  BaseNodeFooter,
  BaseNodeHeader,
  BaseNodeHeaderTitle,
} from "@/components/ui/base-node";
import { Button } from "@/components/ui/button";
import { ButtonHandle } from "@/components/ui/button-handle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Plus } from "lucide-react";
import { NodeAppendix } from "@/components/ui/node-appendix";
import { NodeStatusIndicator } from "@/components/ui/node-status-indicator";
import { BaseHandle } from "../ui/base-handle";

export type TriggerNodeData = {
  label?: string;
  description?: string;
};

export type TriggerNode = Node<TriggerNodeData>;

const TriggerNodeComponent = memo(function TriggerNode({
  id,
  data,
}: NodeProps<TriggerNode>) {
  const [isEditingLabel, setIsEditingLabel] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [labelDraft, setLabelDraft] = useState<string>(data.label ?? "Trigger");
  const [descDraft, setDescDraft] = useState<string>(
    data.description ||
      "This trigger activates when a vehicle approaches the entry gate. Sensors like license plate recognition, RFID scanners, or proximity detectors identify the incoming vehicle and initiate the parking workflow."
  );

  const commitLabel = () => {
    (data as any).onUpdateNodeData?.(id, { label: labelDraft });
    setIsEditingLabel(false);
  };

  const commitDescription = () => {
    (data as any).onUpdateNodeData?.(id, { description: descDraft });
    setIsEditingDescription(false);
  };

  return (
    <BaseNode className="bg-blue-50 border-blue-200 min-w-[320px] w-[320px]">
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
              {data.label ?? "Trigger"}
            </span>
          )}
        </BaseNodeHeaderTitle>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="nodrag p-1 bg-blue-100 hover:bg-blue-200 text-blue-700"
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
              "This trigger activates when a vehicle approaches the entry gate. " +
                "Sensors like license plate recognition, RFID scanners, or proximity " +
                "detectors identify the incoming vehicle and initiate the parking workflow."}
          </p>
        )}
      </BaseNodeContent>
      <BaseHandle
        id="source-1"
        type="source"
        position={Position.Bottom}
        className="bg-blue-500"
      />
    </BaseNode>
  );
});

TriggerNodeComponent.displayName = "TriggerNode";

export default TriggerNodeComponent;
