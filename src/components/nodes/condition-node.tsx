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
import { EllipsisVertical } from "lucide-react";
import { NodeStatusIndicator } from "@/components/ui/node-status-indicator";
import { BaseHandle } from "../ui/base-handle";

export type ConditionNodeData = {
  label?: string;
  description?: string;
  trueLabel?: string;
  falseLabel?: string;
  targetHandlePosition?: Position;
  trueHandlePosition?: Position;
  falseHandlePosition?: Position;
};

export type ConditionNode = Node<ConditionNodeData>;

const ConditionNodeComponent = memo(function ConditionNode({
  id,
  data,
}: NodeProps<ConditionNode>) {
  const [isEditingLabel, setIsEditingLabel] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [labelDraft, setLabelDraft] = useState<string>(
    data.label ?? "Condition"
  );
  const [descDraft, setDescDraft] = useState<string>(
    data.description ||
      "This condition evaluates a logical statement to determine the workflow path. Based on the result (true/false), the system branches to different actions or continues to the next step."
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
    <NodeStatusIndicator status="initial" variant="border">
      <BaseNode className="bg-yellow-50 border-yellow-200 min-w-[320px] w-[320px]">
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
                {data.label ?? "Condition"}
              </span>
            )}
          </BaseNodeHeaderTitle>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="nodrag p-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-800"
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
              <DropdownMenuItem
                onClick={() => (data as any).onDeleteNode?.(id)}
              >
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
                "This condition evaluates a logical statement to determine the " +
                  "workflow path. Based on the result (true/false), the system " +
                  "branches to different actions or continues to the next step."}
            </p>
          )}
          <div className="flex justify-between mt-3 text-xs text-gray-600">
            <span>No{data.falseLabel ? `: ${data.falseLabel}` : ""}</span>
            <span>Yes{data.trueLabel ? `: ${data.trueLabel}` : ""}</span>
          </div>
        </BaseNodeContent>
        <BaseHandle
          id="target-1"
          type="target"
          position={data.targetHandlePosition ?? Position.Top}
          className="bg-yellow-500"
        />
        <BaseHandle
          id="true"
          type="source"
          position={data.trueHandlePosition ?? Position.Bottom}
          className="bg-green-500"
        />
        <BaseHandle
          id="false"
          type="source"
          position={data.falseHandlePosition ?? Position.Bottom}
          className="bg-red-500"
        />
      </BaseNode>
    </NodeStatusIndicator>
  );
});

ConditionNodeComponent.displayName = "ConditionNode";

export default ConditionNodeComponent;
