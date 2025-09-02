import { useMemo, useState } from "react";
import { Background, Panel, ReactFlow, type OnConnect } from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { nodeTypes, type CustomNodeType } from "./nodes";
import { edgeTypes, type CustomEdgeType } from "./edges";

import { ZoomSlider } from "@/components/ui/zoom-slider";
import { Button } from "@/components/ui/button";
import { ChatPanel } from "@/components/ui/chat-panel";

interface FlowProps {
  nodes: CustomNodeType[];
  edges: CustomEdgeType[];
  onNodesChange: (changes: any) => void;
  onEdgesChange: (changes: any) => void;
  onConnect: OnConnect;
  onUpdateNodeData: (nodeId: string, updates: Record<string, any>) => void;
  onDeleteNode: (nodeId: string) => void;
  onSelectFlow?: (key: "entry" | "exit") => void;
  activeFlowKey?: "entry" | "exit";
}

export default function Flow({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onUpdateNodeData,
  onDeleteNode,
  onSelectFlow,
  activeFlowKey,
}: FlowProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const proOptions = { hideAttribution: true };

  const nodesWithHandlers = useMemo(() => {
    return nodes.map((n) => ({
      ...n,
      data: { ...(n as any).data, onUpdateNodeData, onDeleteNode },
    })) as CustomNodeType[];
  }, [nodes, onUpdateNodeData]);

  return (
    <ReactFlow<CustomNodeType, CustomEdgeType>
      nodes={nodesWithHandlers}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      edges={edges}
      edgeTypes={edgeTypes}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      proOptions={proOptions}
    >
      <Background />
      <ZoomSlider />
      <Panel position="bottom-center">
        <div className="flex gap-2">
          <Button
            size="icon"
            variant={"secondary"}
            className={`rounded-full hover:bg-primary hover:text-primary-foreground ${
              activeFlowKey === "entry"
                ? "bg-primary text-primary-foreground"
                : ""
            }`}
            onClick={() => onSelectFlow?.("entry")}
            aria-label="Entry flow"
          >
            1
          </Button>
          <Button
            size="icon"
            variant={"secondary"}
            className={`rounded-full hover:bg-primary hover:text-primary-foreground ${
              activeFlowKey === "exit"
                ? "bg-primary text-primary-foreground"
                : ""
            }`}
            onClick={() => onSelectFlow?.("exit")}
            aria-label="Exit flow"
          >
            2
          </Button>
        </div>
      </Panel>
      <Panel position="top-right">
        <div className="bg-background/80 backdrop-blur-sm border rounded-md px-4 py-2 shadow-none">
          <h3 className="text-sm font-medium text-foreground">
            {activeFlowKey === "entry"
              ? "Entry Flow"
              : activeFlowKey === "exit"
              ? "Exit Flow"
              : "Select Flow"}
          </h3>
        </div>
      </Panel>
      <Panel position="bottom-right">
        <ChatPanel
          isOpen={isChatOpen}
          onToggle={() => setIsChatOpen(!isChatOpen)}
        />
      </Panel>
    </ReactFlow>
  );
}
